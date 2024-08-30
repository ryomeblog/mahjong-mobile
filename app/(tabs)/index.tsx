import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Title,
  Menu,
  Provider,
  Checkbox,
  RadioButton,
} from "react-native-paper";

const styles = {
  textStyle: { color: "black" },
  mahjongTilesStyle: { fontSize: 24, color: "black" },
  selectMahjongTilesStyle: { fontSize: 24, color: "white" },
};

const mahjongTiles = [
  "🀇",
  "🀈",
  "🀉",
  "🀊",
  "🀋",
  "🀌",
  "🀍",
  "🀎",
  "🀏",
  "🀐",
  "🀑",
  "🀒",
  "🀓",
  "🀔",
  "🀕",
  "🀖",
  "🀗",
  "🀘",
  "🀙",
  "🀚",
  "🀛",
  "🀜",
  "🀝",
  "🀞",
  "🀟",
  "🀠",
  "🀡",
  "🀀",
  "🀁",
  "🀂",
  "🀃",
  "🀆",
  "🀅",
  "中",
];
const specialWins = [
  "一発",
  "槍槓",
  "嶺上開花",
  "海底撈月",
  "河底撈魚",
  "地和",
  "天和",
];
const winds = ["東", "南", "西", "北"];
const riichiOptions = [
  { label: "立直なし", value: "none" },
  { label: "立直", value: "riichi" },
  { label: "W立直", value: "doubleRiichi" },
];
const winTypes = [
  { label: "ツモ", value: "tsumo" },
  { label: "ロン", value: "ron" },
];

const MahjongForm = () => {
  const [formData, setFormData] = useState({
    round: "",
    wind: "",
    dora: Array(4).fill(""),
    uraDora: Array(4).fill(""),
    riichi: "none",
    winType: "tsumo",
    specialWin: [],
    honba: "",
    handTiles: Array(13).fill(""),
    winningTile: "",
    melds: Array(4).fill(Array(3).fill("")),
  });

  const [menuVisibility, setMenuVisibility] = useState({
    dora: Array(4).fill(false),
    uraDora: Array(4).fill(false),
    handTiles: Array(13).fill(false),
    winningTile: false,
    melds: Array(4).fill(Array(3).fill(false)),
  });

  const updateFormData = (field, value, index = null, subIndex = null) => {
    setFormData((prev) => {
      const newData = { ...prev };
      if (index !== null) {
        newData[field] = [...prev[field]];
        if (subIndex !== null) {
          newData[field][index] = [...prev[field][index]];
          newData[field][index][subIndex] = value;
        } else {
          newData[field][index] = value;
        }
      } else {
        newData[field] = value;
      }
      return newData;
    });
  };

  const toggleMenu = (field, index = null, subIndex = null) => {
    setMenuVisibility((prev) => {
      const newVisibility = { ...prev };
      if (index !== null) {
        newVisibility[field] = [...prev[field]];
        if (subIndex !== null) {
          newVisibility[field][index] = [...prev[field][index]];
          newVisibility[field][index][subIndex] = !prev[field][index][subIndex];
        } else {
          newVisibility[field][index] = !prev[field][index];
        }
      } else {
        newVisibility[field] = !prev[field];
      }
      return newVisibility;
    });
  };

  const renderTileMenu = (field, index = null, subIndex = null) => (
    <React.Fragment key={`${field}-${index}-${subIndex}`}>
      <Menu
        visible={
          subIndex !== null
            ? menuVisibility[field][index][subIndex]
            : index !== null
              ? menuVisibility[field][index]
              : menuVisibility[field]
        }
        onDismiss={() => toggleMenu(field, index, subIndex)}
        anchor={
          <Button
            onPress={() => toggleMenu(field, index, subIndex)}
            mode="outlined"
            style={{ marginBottom: 16 }}
          >
            <Text style={styles.mahjongTilesStyle}>
              {subIndex !== null
                ? formData[field][index][subIndex] || `　`
                : index !== null
                  ? formData[field][index] || `　`
                  : formData[field] || `　`}
            </Text>
          </Button>
        }
      >
        {mahjongTiles.map((emoji, emojiIndex) => (
          <Menu.Item
            key={`${field}-${index}-${subIndex}-${emojiIndex}`}
            onPress={() => {
              updateFormData(field, emoji, index, subIndex);
              toggleMenu(field, index, subIndex);
            }}
            title={<Text style={styles.selectMahjongTilesStyle}>{emoji}</Text>}
          />
        ))}
      </Menu>
    </React.Fragment>
  );

  const renderRadioGroup = (field, options) => (
    <RadioButton.Group
      onValueChange={(value) => updateFormData(field, value)}
      value={formData[field]}
    >
      {options.map((option) => (
        <RadioButton.Item
          key={option.value}
          labelStyle={styles.textStyle}
          {...option}
        />
      ))}
    </RadioButton.Group>
  );

  const renderTileSection = (field, label, count) => (
    <>
      <Text style={styles.textStyle}>{label}</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {Array(count)
          .fill(null)
          .map((_, index) => renderTileMenu(field, index))}
      </View>
    </>
  );

  return (
    <Provider>
      <ScrollView>
        <View style={{ padding: 16 }}>
          <Title style={styles.textStyle}>麻雀点数計算フォーム</Title>
          <Text style={styles.textStyle}>自風</Text>
          {renderRadioGroup(
            "wind",
            winds.map((wind) => ({ label: wind, value: wind }))
          )}
          <TextInput
            label="局"
            value={formData.round}
            onChangeText={(value) => updateFormData("round", value)}
            mode="outlined"
            style={{ marginBottom: 16, backgroundColor: "white" }}
            keyboardType="numeric"
          />
          {renderTileSection("dora", "ドラ表示牌", 4)}
          {renderTileSection("uraDora", "裏ドラ表示牌", 4)}
          <Text style={styles.textStyle}>立直の有無</Text>
          {renderRadioGroup("riichi", riichiOptions)}
          <Text style={styles.textStyle}>ツモかロンの選択</Text>
          {renderRadioGroup("winType", winTypes)}
          <Text style={styles.textStyle}>特殊アガリ</Text>
          {specialWins.map((win) => (
            <Checkbox.Item
              key={win}
              label={win}
              labelStyle={styles.textStyle}
              status={
                formData.specialWin.includes(win) ? "checked" : "unchecked"
              }
              onPress={() => {
                const newSpecialWin = formData.specialWin.includes(win)
                  ? formData.specialWin.filter((item) => item !== win)
                  : [...formData.specialWin, win];
                updateFormData("specialWin", newSpecialWin);
              }}
            />
          ))}
          <TextInput
            label="本場"
            value={formData.honba}
            onChangeText={(value) => updateFormData("honba", value)}
            mode="outlined"
            style={{ marginBottom: 16, backgroundColor: "white" }}
            keyboardType="numeric"
          />
          {renderTileSection("handTiles", "手牌", 13)}
          <Text style={styles.textStyle}>アガリ牌</Text>
          {renderTileMenu("winningTile")}
          <Text style={styles.textStyle}>鳴き牌</Text>
          {formData.melds.map((_, meldIndex) => (
            <View
              key={`meld-${meldIndex}`}
              style={{ flexDirection: "row", flexWrap: "wrap" }}
            >
              {Array(3)
                .fill(null)
                .map((_, tileIndex) =>
                  renderTileMenu("melds", meldIndex, tileIndex)
                )}
            </View>
          ))}
          <Button
            mode="contained"
            onPress={() => console.log(formData)}
            style={{ marginTop: 16 }}
          >
            計算
          </Button>
        </View>
      </ScrollView>
    </Provider>
  );
};

export default MahjongForm;
