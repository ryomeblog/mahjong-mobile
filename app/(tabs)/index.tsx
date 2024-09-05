import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  TextInput,
  Button,
  RadioButton,
  Checkbox,
  Text,
  Portal,
  Provider,
} from "react-native-paper";

export default function App() {
  const [zhuangfeng, setZhuangfeng] = useState("0");
  const [menfeng, setMenfeng] = useState("0");
  const [lizhi, setLizhi] = useState("0");
  const [tsumo, setTsumo] = useState(false);
  const [yifa, setYifa] = useState(false);
  const [qianggang, setQianggang] = useState(false);
  const [lingshang, setLingshang] = useState(false);
  const [haidi, setHaidi] = useState("0");
  const [tianhu, setTianhu] = useState("0");
  const [baopai, setBaopai] = useState([]);
  const [fubaopai, setFubaopai] = useState([]);
  const [changbang, setChangbang] = useState("0");
  const [lizhibang, setLizhibang] = useState("0");
  const [shoupai, setShoupai] = useState("");
  const [rongpai, setRongpai] = useState("");
  const [naki1, setNaki1] = useState("");
  const [naki2, setNaki2] = useState("");
  const [naki3, setNaki3] = useState("");
  const [naki4, setNaki4] = useState("");

  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleCalculate = () => {
    const data = {
      zhuangfeng,
      menfeng,
      lizhi,
      yifa,
      qianggang,
      lingshang,
      haidi,
      tianhu,
      baopai,
      fubaopai,
      changbang: parseInt(changbang, 10),
      lizhibang: parseInt(lizhibang, 10),
      shoupai,
      naki1,
      naki2,
      naki3,
      naki4,
    };
    console.log(data);
    console.log(JSON.stringify(data));
  };

  const openModal = (content) => {
    setModalContent(content);
    setVisible(true);
  };

  const createModalContent = (options, setter, currentValue, labels) => (
    <RadioButton.Group
      onValueChange={(value) => {
        setter(value);
        setVisible(false);
      }}
      value={currentValue}
    >
      {options.map((option, index) => (
        <RadioButton.Item
          key={index}
          label={labels[index]}
          value={String(index)}
          labelStyle={{ color: "black" }}
        />
      ))}
    </RadioButton.Group>
  );

  const renderSelectableField = (title, value, setter, options, labels) => (
    <>
      <TouchableOpacity
        onPress={() =>
          openModal(createModalContent(options, setter, value, labels))
        }
      >
        <Text style={styles.selectText}>
          {title}: {labels[parseInt(value)]}
        </Text>
      </TouchableOpacity>
    </>
  );

  const renderCheckboxItem = (label, value, setter) => (
    <Checkbox.Item
      label={label}
      status={value ? "checked" : "unchecked"}
      onPress={() => setter(!value)}
      labelStyle={{ color: "black" }}
    />
  );

  const renderTileImages = (tiles) => {
    return generateTileAndImageUrls(tiles).map((tileAndUrls, index) => {
      return (
        <Image
          key={index}
          source={{ uri: tileAndUrls.imageUrl }}
          style={styles.tileImage}
        />
      );
    });
  };

  const renderDoraImages = (tiles) => {
    return generateTileAndImageUrls(groupTiles(tiles.join(""))).map(
      (tileAndUrls, index) => {
        return (
          <Image
            key={index}
            source={{ uri: tileAndUrls.imageUrl }}
            style={styles.tileImage}
          />
        );
      }
    );
  };

  const renderTileSelection = (setter) => {
    const tiles = [
      "m1",
      "m2",
      "m3",
      "m4",
      "m5",
      "m6",
      "m7",
      "m8",
      "m9",
      "p1",
      "p2",
      "p3",
      "p4",
      "p5",
      "p6",
      "p7",
      "p8",
      "p9",
      "s1",
      "s2",
      "s3",
      "s4",
      "s5",
      "s6",
      "s7",
      "s8",
      "s9",
      "z1",
      "z2",
      "z3",
      "z4",
      "z5",
      "z6",
      "z7",
      "m0",
      "p0",
      "s0",
    ];
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <View style={styles.handContainer}>
          <Text style={styles.selectText}>手牌</Text>
          <Text style={styles.selectText}>{shoupai}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {generateTileAndImageUrls(shoupai).map((tileAndUrls, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setter((prev) =>
                      prev ? removeTile(prev, tileAndUrls.tile) : ""
                    );
                  }}
                >
                  <Image
                    key={index}
                    source={{ uri: tileAndUrls.imageUrl }}
                    style={styles.tileImage}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.tilesContainer}>
          <Text style={styles.selectText}>牌</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {tiles.map((tile, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setter((prev) =>
                      prev ? groupTiles(`${prev}${tile}`) : tile
                    );
                  }}
                >
                  <Image
                    source={{ uri: `../assets/images/${tile}.png` }}
                    style={styles.tileImage}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const renderDraSelection = (setter) => {
    const tiles = [
      "m1",
      "m2",
      "m3",
      "m4",
      "m5",
      "m6",
      "m7",
      "m8",
      "m9",
      "p1",
      "p2",
      "p3",
      "p4",
      "p5",
      "p6",
      "p7",
      "p8",
      "p9",
      "s1",
      "s2",
      "s3",
      "s4",
      "s5",
      "s6",
      "s7",
      "s8",
      "s9",
      "z1",
      "z2",
      "z3",
      "z4",
      "z5",
      "z6",
      "z7",
      "m0",
      "p0",
      "s0",
    ];

    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <View style={styles.handContainer}>
          <Text style={styles.selectText}>手牌</Text>
          <Text style={styles.selectText}>{shoupai}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {generateTileAndImageUrls(shoupai).map((tileAndUrls, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setter((prev) => {
                      if (prev) return prev;
                      const removeIndex = prev.indexOf(tileAndUrls.tile);
                      if (removeIndex !== -1)
                        return prev.splice(removeIndex, 1);
                      return prev;
                    });
                  }}
                >
                  <Image
                    key={index}
                    source={{ uri: tileAndUrls.imageUrl }}
                    style={styles.tileImage}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.tilesContainer}>
          <Text style={styles.selectText}>牌</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {tiles.map((tile, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setter((prev) => [...prev, tile]);
                  }}
                >
                  <Image
                    source={{ uri: `../assets/images/${tile}.png` }}
                    style={styles.tileImage}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const renderNakiSelection = (setter) => {
    const tiles = [
      "m1",
      "m2",
      "m3",
      "m4",
      "m5",
      "m6",
      "m7",
      "m8",
      "m9",
      "p1",
      "p2",
      "p3",
      "p4",
      "p5",
      "p6",
      "p7",
      "p8",
      "p9",
      "s1",
      "s2",
      "s3",
      "s4",
      "s5",
      "s6",
      "s7",
      "s8",
      "s9",
      "z1",
      "z2",
      "z3",
      "z4",
      "z5",
      "z6",
      "z7",
      "m0",
      "p0",
      "s0",
    ];
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <View style={styles.handContainer}>
          <Text style={styles.selectText}>鳴き牌</Text>
          <Text style={styles.selectText}>{shoupai}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {generateTileAndImageUrls(shoupai).map((tileAndUrls, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setter((prev) =>
                      prev ? removeTile(prev, tileAndUrls.tile) : ""
                    );
                  }}
                >
                  <Image
                    key={index}
                    source={{ uri: tileAndUrls.imageUrl }}
                    style={styles.tileImage}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.tilesContainer}>
          <Text style={styles.selectText}>牌</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {tiles.map((tile, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setter((prev) =>
                      prev
                        ? prev.length === 3
                          ? groupTiles(`${prev}${tile}`) + "-"
                          : groupTiles(`${prev}${tile}`)
                        : tile
                    );
                  }}
                >
                  <Image
                    source={{ uri: `../assets/images/${tile}.png` }}
                    style={styles.tileImage}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  function removeTile(tiles, tile) {
    const group = tile[0]; // グループを判断するための先頭文字
    const numberToRemove = tile[1]; // 削除する数字

    // グループを見つけるための正規表現
    const regex = new RegExp(`${group}[0-9]+`);
    const match = tiles.match(regex);

    if (match) {
      // グループ内の数字を取得
      let groupNumbers = match[0].slice(1).split("");

      // 削除する数字を一つだけ取り除く
      const index = groupNumbers.indexOf(numberToRemove);
      if (index !== -1) {
        groupNumbers.splice(index, 1);
      }

      // 新しいグループ文字列を作成
      let newGroup = group + groupNumbers.join("");

      // グループが空になった場合、先頭の英字も削除
      if (newGroup === group) {
        newGroup = "";
      }

      // 元の文字列のグループを新しいグループに置き換える
      return tiles.replace(match[0], newGroup);
    }

    // グループが見つからなかった場合は元の文字列を返す
    return tiles;
  }

  function groupTiles(tiles) {
    const groups = { m: [], p: [], s: [], z: [] };

    // 文字列を解析してグループに追加
    let i = 0;
    while (i < tiles.length) {
      const group = tiles[i];
      let j = i + 1;
      while (j < tiles.length && !isNaN(tiles[j])) {
        j++;
      }
      const numbers = tiles.slice(i + 1, j).split("");
      if (groups[group]) {
        groups[group].push(...numbers);
      }
      i = j;
    }

    // 各グループをソートして結合
    let result = "";
    for (const group of ["m", "p", "s", "z"]) {
      if (groups[group].length > 0) {
        groups[group].sort();
        result += group + groups[group].join("");
      }
    }

    return result;
  }

  function generateTileAndImageUrls(tiles) {
    const groups = { m: [], p: [], s: [], z: [] };

    // 文字列を解析してグループに追加
    let i = 0;
    while (i < tiles.length) {
      const group = tiles[i];
      let j = i + 1;
      while (j < tiles.length && !isNaN(tiles[j])) {
        j++;
      }
      const numbers = tiles.slice(i + 1, j).split("");
      if (groups[group]) {
        groups[group].push(...numbers);
      }
      i = j;
    }

    // 画像URLを生成
    const tileAndUrls = [];
    for (const group in groups) {
      groups[group].forEach((number) => {
        tileAndUrls.push({
          tile: `${group}${number}`,
          imageUrl: `../assets/images/${group}${number}.png`,
        });
      });
    }

    return tileAndUrls;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flexGrow: 1,
    },
    form: {
      padding: 16,
    },
    selectText: {
      fontSize: 24,
      color: "black",
    },
    textInput: {
      backgroundColor: "white", // 背景色を白に設定
      borderColor: "black", // 枠の色を黒に設定
      borderWidth: 1, // 枠の幅を設定
      color: "black", // 文字の色を黒に設定
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    tileImage: {
      width: 40,
      height: 60,
      margin: 2,
    },
    handContainer: {
      borderWidth: 1,
      borderColor: "black",
      padding: 10,
      margin: 5,
      flexWrap: "wrap",
      maxWidth: "100%",
    },
    tilesContainer: {
      borderWidth: 1,
      borderColor: "black",
      padding: 10,
      margin: 5,
      flexWrap: "wrap",
      maxWidth: "100%",
    },
  });

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.form}>
            {renderSelectableField(
              "場風",
              zhuangfeng,
              setZhuangfeng,
              ["0", "1", "2", "3"],
              ["東", "南", "西", "北"]
            )}
            {renderSelectableField(
              "自風",
              menfeng,
              setMenfeng,
              ["0", "1", "2", "3"],
              ["東", "南", "西", "北"]
            )}
            {renderSelectableField(
              "リーチ",
              lizhi,
              setLizhi,
              ["0", "1", "2"],
              ["リーチなし", "リーチ", "ダブルリーチ"]
            )}

            {renderCheckboxItem("ツモ", tsumo, setTsumo)}
            {renderCheckboxItem("リーチ一発", yifa, setYifa)}
            {renderCheckboxItem("嶺上開花", lingshang, setLingshang)}
            {renderCheckboxItem("槍槓", qianggang, setQianggang)}
            {renderSelectableField(
              "海底撈月",
              haidi,
              setHaidi,
              ["0", "1", "2"],
              ["ハイテイなし", "ハイテイツモ", "ハイテイロン"]
            )}
            {renderSelectableField(
              "天和/地和",
              tianhu,
              setTianhu,
              ["0", "1", "2"],
              ["天和/地和なし", "天和", "地和"]
            )}

            <TouchableOpacity
              onPress={() =>
                openModal(
                  <View>
                    <Text style={styles.modalText}>ドラを選択してください</Text>
                    {renderDraSelection(setBaopai)}
                  </View>
                )
              }
            >
              <Text style={styles.selectText}>ドラ: {baopai}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {renderDoraImages(baopai)}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                openModal(
                  <View>
                    <Text style={styles.modalText}>
                      裏ドラを選択してください
                    </Text>
                    {renderDraSelection(setFubaopai)}
                  </View>
                )
              }
            >
              <Text style={styles.selectText}>裏ドラ: {fubaopai}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {renderDoraImages(fubaopai)}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                openModal(
                  <View>
                    <Text style={styles.modalText}>手牌を選択してください</Text>
                    {renderTileSelection(setShoupai)}
                  </View>
                )
              }
            >
              <Text style={styles.selectText}>手牌: {shoupai}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {renderTileImages(shoupai)}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                openModal(
                  <View>
                    <Text style={styles.modalText}>
                      鳴き牌1を選択してください
                    </Text>
                    {renderNakiSelection(setNaki1)}
                  </View>
                )
              }
            >
              <Text style={styles.selectText}>鳴き牌1: {naki1}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {renderTileImages(naki1)}
              </View>
            </TouchableOpacity>

            {naki1 && (
              <TouchableOpacity
                onPress={() =>
                  openModal(
                    <View>
                      <Text style={styles.modalText}>
                        鳴き牌2を選択してください
                      </Text>
                      {renderNakiSelection(setNaki2)}
                    </View>
                  )
                }
              >
                <Text style={styles.selectText}>鳴き牌2: {naki2}</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {renderTileImages(naki2)}
                </View>
              </TouchableOpacity>
            )}

            {naki2 && (
              <TouchableOpacity
                onPress={() =>
                  openModal(
                    <View>
                      <Text style={styles.modalText}>
                        鳴き牌3を選択してください
                      </Text>
                      {renderNakiSelection(setNaki3)}
                    </View>
                  )
                }
              >
                <Text style={styles.selectText}>鳴き牌3: {naki3}</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {renderTileImages(naki3)}
                </View>
              </TouchableOpacity>
            )}

            {naki3 && (
              <TouchableOpacity
                onPress={() =>
                  openModal(
                    <View>
                      <Text style={styles.modalText}>
                        鳴き牌4を選択してください
                      </Text>
                      {renderNakiSelection(setNaki4)}
                    </View>
                  )
                }
              >
                <Text style={styles.selectText}>鳴き牌5: {naki5}</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {renderTileImages(naki4)}
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() =>
                openModal(
                  <View>
                    <Text style={styles.modalText}>
                      アガリ牌を選択してください
                    </Text>
                    {renderTileSelection(setRongpai)}
                  </View>
                )
              }
            >
              <Text style={styles.selectText}>アガリ牌: {rongpai}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {renderTileImages(rongpai)}
              </View>
            </TouchableOpacity>

            <TextInput
              label="本場"
              value={changbang}
              onChangeText={(text) => setChangbang(text)}
              keyboardType="numeric"
              style={styles.textInput}
              contentStyle={{ color: "black" }}
            />
            <TextInput
              label="リーチ棒"
              value={lizhibang}
              onChangeText={(text) => setLizhibang(text)}
              keyboardType="numeric"
              style={styles.textInput}
              contentStyle={{ color: "black" }}
            />

            <Button
              mode="contained"
              onPress={handleCalculate}
              style={{ marginTop: 16 }}
            >
              計算
            </Button>
          </View>
        </ScrollView>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={styles.modalView}
          >
            {modalContent}
            <Button
              mode="contained"
              onPress={() => setVisible(false)}
              style={{ marginTop: 16 }}
            >
              閉じる
            </Button>
          </Modal>
        </Portal>
      </SafeAreaView>
    </Provider>
  );
}
