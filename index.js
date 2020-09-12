const readline = require('readline-sync')
const Parser = require('rss-parser');
const robots = {
  //userInput: require('./robots/user-input.js'),
  text: require('./robots/text.js')
}

const TREND_URL = 'https://trends.google.com/trends/trendingsearches/daily/rss?geo=BR'

async function start () {
  const content = {}

  content.searchTerm = await askAndReturnSearchTerm()
  content.prefix = askAndReturnPrefix()

  //robots.userInput(content)
  await robots.text(content)

  async function askAndReturnSearchTerm () {
    const response = readline.question('Escreva um termo de busca da Wikipedia ou GT para buscar no google trends: ')

    return (response.toUpperCase() === 'GT') ?  await askAndReturnTrend() : response

  }

  async function askAndReturnTrend() {
    console.log('Favor aguarde...')
    const trends = await getGoogleTrends()
    const choice = readline.keyInSelect(trends, 'Escolha o assunto:')

    return trends[choice]

  }

  async function getGoogleTrends () {
    const parser = new Parser();
    const trends = await parser.parseURL(TREND_URL);
    return trends.items.map(i => i.title)
  }

  function askAndReturnPrefix () {
    const prefixes = ['Quem é', 'O que é', 'A história de']
    const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Escolha uma opção: ')
    const selectedPrefixText = prefixes[selectedPrefixIndex]

    return selectedPrefixText
  }

  console.log(content)
}

start()
