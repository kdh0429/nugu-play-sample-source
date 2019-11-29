const express = require('express');
const nugu = require('../nugu');
const router = express.Router();

router.post(`/nugu/ThrowDiceAction`, nugu);
router.post(`/nugu/ThrowYesAction`, nugu);

//router.post(`/nugu/answer.opponent`, nugu);
router.post(`/nugu/answer.opponent.specific`, nugu);
router.post(`/nugu/answer.opponent.caution_champion`, nugu);
router.post(`/nugu/answer.spell.specific_champion.specific_spell`, nugu);
router.post(`/nugu/answer.spell.specific_champion.wo_specific_spell`, nugu);
router.post(`/nugu/answer.spell.all`, nugu);
router.post(`/nugu/recommend_champion_lane`, nugu);
router.post(`/nugu/recommend_champion_opponent`, nugu);
router.post(`/nugu/recommend_champion_default`, nugu);
router.post(`/nugu/recommend.item.specific_core`, nugu);
router.post(`/nugu/recommend.item.all`, nugu);
router.post(`/nugu/recommend.skill.specific`, nugu);
router.post(`/nugu/recommend.skill.all`, nugu);
router.post(`/nugu/write.used_spell`, nugu);

module.exports = router;
