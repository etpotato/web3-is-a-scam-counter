require('dotenv').config()
const { createClient } = require('@supabase/supabase-js') 

const SB = {
  project: process.env.SUPABASE_URL,
  key: process.env.SUPABASE_ANON_KEY,
  table: 'counter'
}

const supabase = createClient(SB.project, SB.key);

async function incrementCounter(sbClient) {
  try {
    const counterTable = await sbClient.from(SB.table).select();
    const counterData = counterTable?.data[0];
  
    if (!counterData) return

    const { current_value, max_value, id } = counterData;

    console.log('current:', current_value, '/', max_value)

    if (current_value < max_value) {
      await supabase
        .from(SB.table)
        .update({ current_value: current_value + 1 })
        .eq('id', id)
      
      console.log('updated:', current_value + 1, '/', max_value)
    } 

  } catch (err) {
    console.error(err)
  } finally {
    setTimeout(() => incrementCounter(sbClient), 1 * 60 * 1000)
  }
}

incrementCounter(supabase)

