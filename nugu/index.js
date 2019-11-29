const uuid = require('uuid').v4
const _ = require('lodash')
const { DOMAIN } = require('../config')

class NPKRequest {
  constructor (httpReq) {
    this.context = httpReq.body.context
    this.action = httpReq.body.action
    console.log(`NPKRequest: ${JSON.stringify(this.context)}, ${JSON.stringify(this.action)}`)
  }

  do(npkResponse) {
    this.actionRequest(npkResponse)
  }

  actionRequest(npkResponse) {
    console.log('actionRequest')
    console.dir(this.action)

    const actionName = this.action.actionName
    const parameters = this.action.parameters

    switch (actionName) { 
    case `/nugu/answer.opponent.specific`:
      npkResponse.answerOpponentChampionWinningRateAndTear()
      break
    case `/nugu/answer.opponent.caution_champion`:
      npkResponse.answerCautionChampion()
      break
    case `/nugu/answer.spell.specific_champion.specific_spell`:
      data1 = ''
      data2 = ''
      data3 = ''
      break
    case `/nugu/answer.spell.specific_champion.wo_specific_spell`:
      data1 = ''
      data2 = ''
      data3 = ''
      break
    case `/nugu/answer.spell.all`:
      data1 = ''
      data2 = ''
      data3 = ''
      break
    case `/nugu/recommend_champion_opponent`:
      data1 = ''
      data2 = ''
      data3 = ''
      break
    case `/nugu/recommend_champion_default`:
      data1 = ''
      data2 = ''
      data3 = ''
      break
    case `/nugu/recommend.item.specific_core`:
      data1 = ''
      data2 = ''
      data3 = ''
      break
    case `/nugu/recommend.item.all`:
      data1 = ''
      data2 = ''
      data3 = ''
      break
    case `/nugu/recommend.skill.specific`:
      data1 = ''
      data2 = ''
      data3 = ''
      break
    case `/nugu/recommend.skill.all`:
      data1 = ''
      data2 = ''
      data3 = ''
      break
    case `/nugu/write.used_spell`:
      data1 = ''
      data2 = ''
      data3 = ''
      break
    }
  }
}

class NPKResponse {
  constructor () {
    console.log('NPKResponse constructor')

    this.version = '2.0'
    this.resultCode = 'OK'
    this.output = {}
    this.directives = []
  }

  answerOpponentChampionWinningRateAndTear(){
    // CRAWLING CODE HAS TO BE IMPLEMENTED HERE
    // Return : 상대 챔피언 승률, 티어
    this.output = {
      OPPONENT_CHAMPION_TEAR: '골드',
      OPPONENT_CHAMPION_WINNING_RATE: '86',
    }
  }
  answerCautionChampion() {
    // CRAWLING CODE HAS TO BE IMPLEMENTED HERE
    // Return: 상대팀 중 제일 잘하는 챔피언 이름, 승률, 티어
    this.output = {
      OPPONENT_CAUTION_CHAMPION: '애쉬',
      OPPONENT_CHAMPION_TEAR: '골드',
      OPPONENT_CHAMPION_WINNING_RATE: '86',
    }
  }

}

const nuguReq = function (httpReq, httpRes, next) {
  npkResponse = new NPKResponse()
  npkRequest = new NPKRequest(httpReq)
  npkRequest.do(npkResponse)
  console.log(`NPKResponse: ${JSON.stringify(npkResponse)}`)
  return httpRes.send(npkResponse)
};

module.exports = nuguReq;
