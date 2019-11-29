import numpy as np
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import time
from game import Game
from config import Config
import csv
import pandas as pd

config = Config()

API_KEY = config.api_key

SUMMONER_NAME_URL = config.summoner_name_url
TIER_URL = config.tier_url
CURRENT_GAME_URL = config.current_game_url
MATCH_HISTORY = config.match_history
CHAMP_MASTERY = config.champ_mastery
OPGG_USER_URL = config.opgg_user_url


def get_player_id(player_name):
    r = requests.get(SUMMONER_NAME_URL + player_name +'?api_key=' + API_KEY)
    return r.json()['id'], r.json()['accountId']

def PlayerSummary(player_name):
    search = requests.get(OPGG_USER_URL + player_name)
    html = search.text
    user_soup = BeautifulSoup(html, 'html.parser')

    raw_data = user_soup.find("meta", {"name":"description"}).get('content')
    user_data = raw_data.split('/')
    
    user_tier = user_data[1].split(' ')[1:-1]
    user_winning_rate = user_data[2].split(' ')[-2]
    user_most_champs_raw = user_data[3].split(',')[:3]
    user_most_champs = []
    for champ in user_most_champs_raw:
        tmp = champ.replace(' ', '',1)
        user_most_champs.append(tmp.replace(' -', '', 1).split(' '))

    return {'tier': user_tier, 'winning_rate': user_winning_rate, 'most_champs': user_most_champs}

def ChamionSummary(champion_name):
    
    champ_stats_url = config.get_champ_stat_url(champion_name)
    search = requests.get(champ_stats_url)
    html = search.text
    champ_soup = BeautifulSoup(html, 'html.parser') #html.parser를 사용해서 soup에 넣겠다
    
    # Get a skill tree
    skill_tree = champ_soup.select(".champion-stats__list__item span")
    skill_recommend = []
    for skill in skill_tree:
        skill_recommend.append(skill.text)
    print(skill_recommend)

    # Get a rune and winning rate
    runes = champ_soup.select(".champion-stats-summary-rune__name")
    rune_rates = champ_soup.select(".champion-stats-summary-rune__rate span")
    rune_rates = [e.text for e in rune_rates if e.text not in ('Pick Rate', 'Win Rate')]
    
    recommend_rune_list = []
    for rune, rune_rate in zip(runes, rune_rates):
        recommend_rune_list.append([rune.text, rune_rate])
    print(recommend_rune_list)

    # Get a item tree and winning rate
    items = champ_soup.select(".champion-overview__row.champion-overview__row")
    item_recommend_list = []
    for item in items:
        item_names = item.select(".champion-stats__list__item")
        tmp = []
        if len(item_names) != 1:
            for item_name in item_names:
                tmp.append( str(item_name).split('&gt')[1].split(';')[1][:-3] )
        else:
            tmp.append( str(item_names[0]).split('&gt')[1].split(';')[1][:-3] )
        tmp.append(item.select(".champion-overview__stats.champion-overview__stats--win.champion-overview__border")[0].text.split('\n')[1])# get item winning rate
        item_recommend_list.append(tmp)
    print(item_recommend_list)

    # Get a counter
    counters = champ_soup.select(".champion-stats-header-matchup__table__winrate")
    a = champ_soup.select(".champion-stats-header-matchup__table.champion-stats-header-matchup__table--strong.tabItem td")
    # print(a)

    

# hey = '-1'
# a = 'minsoo{}'.format(hey)
# print(a)
# hey = '-2'
# a = 'minsoo{}'.format(hey)
# print(a)


if __name__ == "__main__":
    
    player_name = 'Hidden in bush'
    account_id = None
    player_id = None

    ############ --------- PLAYER SUMMARY ---------- ############
    player_summary = PlayerSummary(player_name)
    print(player_summary)

    chamion_name = 'aurelionsol'
    champ_summary = ChamionSummary(chamion_name)
    # print(champ_data.find_all("span"))# print(champ_data.get("span"))

    player_id, account_id = get_player_id(player_name)
    print(player_id)
    print(account_id)

    # r = requests.get(MATCH_HISTORY + account_id + '?api_key=' + API_KEY).json()


    # ## current game!
    # current_game_info = requests.get(CURRENT_GAME_URL + player_id +'?api_key=' + API_KEY).json()

    # current_game = Game(player_name, current_game_info)
    # # print(current_game.participants)
    # print(current_game.players_name)
    # print(current_game.players_level)
    # print(current_game.players_champion)
    # print(current_game.players_spell)

    # print(current_game.level_of_champion(0))