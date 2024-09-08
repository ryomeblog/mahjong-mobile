import React, { useState } from "react";
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
  // TextInput,
  Button,
  RadioButton,
  Checkbox,
  Text,
  Portal,
  Provider,
} from "react-native-paper";
import Majiang from "@kobalab/majiang-core";

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
  // const [changbang, setChangbang] = useState("0");
  // const [lizhibang, setLizhibang] = useState("0");
  const [shoupai, setShoupai] = useState("");
  const [rongpai, setRongpai] = useState("");
  const [naki1, setNaki1] = useState("");
  const [naki2, setNaki2] = useState("");
  const [naki3, setNaki3] = useState("");
  const [naki4, setNaki4] = useState("");
  const [huluView, setHuluView] = useState(null);

  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [visibleNaki, setVisibleNaki] = useState(false);
  const [modalContentNaki, setModalContentNaki] = useState(null);

  const [visibleHulu, setVisibleHulu] = useState(false);

  const handleCalculate = () => {
    // const data = {
    //   zhuangfeng,
    //   menfeng,
    //   lizhi,
    //   tsumo,
    //   yifa,
    //   qianggang,
    //   lingshang,
    //   haidi,
    //   tianhu,
    //   baopai,
    //   fubaopai,
    //   // changbang: parseInt(changbang, 10),
    //   // lizhibang: parseInt(lizhibang, 10),
    //   shoupai,
    //   naki1,
    //   naki2,
    //   naki3,
    //   naki4,
    // };

    let shoupaiAndNaki = tsumo ? groupTiles(shoupai + rongpai) : shoupai;
    const nakis = [naki1, naki2, naki3, naki4].filter((naki) => naki);
    if (nakis.length > 0) {
      shoupaiAndNaki += (shoupaiAndNaki ? "," : "") + nakis.join(",");
    }

    const data = {
      shoupaiAndNaki: shoupaiAndNaki,
      rongpai: tsumo ? null : rongpai,
      rule: Majiang.rule(),
      zhuangfeng: parseInt(zhuangfeng), // 場風（0: 東、1: 南、2: 西、3: 北）
      menfeng: parseInt(menfeng), // 自風（0: 東、1: 南、2: 西、3: 北）
      hupai: {
        lizhi: parseInt(lizhi), // 0: リーチなし、1: リーチ、2: ダブルリーチ
        yifa: yifa, // リーチ一発のとき true
        qianggang: qianggang, // 槍槓のとき true
        lingshang: lingshang, // 嶺上開花のとき true
        haidi: parseInt(haidi), // 海底撈月（0: ハイテイなし、1: ハイテイツモ、2: ハイテイロン）
        tianhu: parseInt(tianhu), // 天和/地和（0: 天和/地和なし、1: 天和、2: 地和）
      },
      baopai: baopai, // ドラ表示
      fubaopai: fubaopai, // 裏ドラ
      jicun: {
        changbang: 0, // 本場
        lizhibang: 0, // リーチ棒
      },
    };
    console.log(data);
    console.log(JSON.stringify(data));

    const hule = Majiang.Util.hule(
      Majiang.Shoupai.fromString(shoupaiAndNaki),
      tsumo ? null : rongpai,
      Majiang.Util.hule_param({
        rule: Majiang.rule(),
        zhuangfeng: zhuangfeng, // 場風（0: 東、1: 南、2: 西、3: 北）
        menfeng: menfeng, // 自風（0: 東、1: 南、2: 西、3: 北）
        hupai: {
          lizhi: lizhi, // 0: リーチなし、1: リーチ、2: ダブルリーチ
          yifa: yifa, // リーチ一発のとき true
          qianggang: qianggang, // 槍槓のとき true
          lingshang: lingshang, // 嶺上開花のとき true
          haidi: haidi, // 海底撈月（0: ハイテイなし、1: ハイテイツモ、2: ハイテイロン）
          tianhu: tianhu, // 天和/地和（0: 天和/地和なし、1: 天和、2: 地和）
        },
        baopai: baopai, // ドラ表示
        fubaopai: fubaopai, // 裏ドラ
        jicun: {
          changbang: 0, // 本場
          lizhibang: 0, // リーチ棒
        },
      })
    );
    console.log("hule:", hule);
    if (hule) {
      setHuluView(hule);
      openHuluModal();
    }
  };

  const openModal = (content) => {
    setModalContent(content);
    setVisible(true);
  };

  const openNakiModal = (content) => {
    setModalContentNaki(content);
    setVisible(false);
    setVisibleNaki(true);
  };

  const openHuluModal = () => {
    setVisible(false);
    setVisibleNaki(false);
    setVisibleHulu(true);
  };

  const closeNakiModal = () => {
    setVisible(false);
    setVisibleNaki(false);
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

  const renderSelectableNakiField = (tiles, setter) => {
    const tilesPatterns = generatePatterns(tiles);
    return (
      <>
        {tilesPatterns.map((tilesPattern) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setter(tilesPattern);
                closeNakiModal();
              }}
            >
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {generateTileAndImageUrls(tilesPattern).map(
                  (tileAndUrls, index) => {
                    return (
                      <Image
                        key={index}
                        source={{ uri: tileAndUrls.imageUrl }}
                        style={[
                          styles.tileImage,
                          tileAndUrls.yoko && {
                            transform: [{ rotate: "90deg" }],
                          },
                        ]}
                      />
                    );
                  }
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </>
    );
  };

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
          style={[
            styles.tileImage,
            tileAndUrls.yoko && {
              transform: [{ rotate: "90deg" }],
            },
          ]}
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
            style={[
              styles.tileImage,
              tileAndUrls.yoko && {
                transform: [{ rotate: "90deg" }],
              },
            ]}
          />
        );
      }
    );
  };

  const renderTileSelection = (selectTiles, setter) => {
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
          <Text style={styles.selectText}>手牌{selectTiles}</Text>
          <Text style={styles.selectText}>{selectTiles}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {generateTileAndImageUrls(selectTiles).map((tileAndUrls, index) => {
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
                    style={[
                      styles.tileImage,
                      tileAndUrls.yoko && {
                        transform: [{ rotate: "90deg" }],
                      },
                    ]}
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

  const renderDraSelection = (doraTile, setter) => {
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
          <Text style={styles.selectText}>ドラ</Text>
          <Text style={styles.selectText}>{doraTile}</Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {generateTileAndImageUrls(groupTiles(doraTile.join(""))).map(
              (tileAndUrls, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setter((prev) => {
                        if (!prev) return prev;
                        const removeIndex = prev.indexOf(tileAndUrls.tile);
                        console.log("removeIndex", removeIndex);
                        console.log("tileAndUrls.tile", tileAndUrls.tile);
                        if (removeIndex === 0) return [];
                        if (removeIndex !== -1)
                          return prev.splice(removeIndex, 1);
                        return prev;
                      });
                    }}
                  >
                    <Image
                      key={index}
                      source={{ uri: tileAndUrls.imageUrl }}
                      style={[
                        styles.tileImage,
                        tileAndUrls.yoko && {
                          transform: [{ rotate: "90deg" }],
                        },
                      ]}
                    />
                  </TouchableOpacity>
                );
              }
            )}
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

  const renderNakiSelection = (naki, setter) => {
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
    let nakiTile = naki;
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <View style={styles.handContainer}>
          <Text style={styles.selectText}>鳴き牌</Text>
          <Text style={styles.selectText}>{nakiTile}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {generateTileAndImageUrls(nakiTile).map((tileAndUrls, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setter("");
                    closeNakiModal();
                  }}
                >
                  <Image
                    key={index}
                    source={{ uri: tileAndUrls.imageUrl }}
                    style={[
                      styles.tileImage,
                      tileAndUrls.yoko && {
                        transform: [{ rotate: "90deg" }],
                      },
                    ]}
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
                    nakiTile = nakiTile
                      ? groupTiles(`${nakiTile}${tile}`)
                      : tile;
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

        <Button
          mode="contained"
          onPress={() =>
            openNakiModal(
              <View>
                <Text style={styles.modalText}>
                  鳴き牌の組み合わせを選択してください
                </Text>
                {renderSelectableNakiField(nakiTile, setter)}
              </View>
            )
          }
          style={{ marginTop: 16, width: "100%" }}
        >
          選択
        </Button>
      </View>
    );
  };

  function isPonOrChi(tiles) {
    const group = tiles[0];
    const numbers = tiles.slice(1).split("").map(Number);

    // ポンの判定
    const isPon = numbers.every((num) => num === numbers[0]);

    // チーの判定
    const isChi =
      numbers.length === 3 &&
      numbers[0] + 1 === numbers[1] &&
      numbers[1] + 1 === numbers[2];

    if (group === "z") {
      return isPon ? "Pon" : "No";
    } else {
      if (isPon) {
        return "Pon";
      } else if (isChi) {
        return "Chi";
      } else {
        return "No";
      }
    }
  }

  function generatePatterns(input) {
    const resultType = isPonOrChi(input);
    let results = [];

    if (resultType === "Pon") {
      results = generatePonPatterns(input);
    } else if (resultType === "Chi") {
      results = generateChiPatterns(input);
    }
    console.log("resultType", resultType);
    console.log("results", results);

    return results;
  }

  function generateChiPatterns(input) {
    const prefix = input[0];
    const numbers = input.slice(1).split("");
    const results = [];

    for (let i = 0; i < numbers.length; i++) {
      const firstNum = numbers[i];
      const restNums = numbers.slice(0, i).concat(numbers.slice(i + 1));
      const newPattern = [...restNums];
      newPattern.splice(0, 0, "-");
      results.push(prefix + firstNum + newPattern.join(""));
    }

    return results;
  }

  function generatePonPatterns(input) {
    const prefix = input[0];
    const numbers = input.slice(1).split(""); // numbersを配列に変換
    const results = [];

    results.push(
      `${prefix}${numbers[0]}-${numbers.slice(1).join("")}`,
      `${prefix}${numbers.slice(0, 2).join("")}=${numbers.slice(2).join("")}`,
      `${prefix}${numbers.join("")}+`
    );

    return results;
  }

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
    const result = [];
    const groups = tiles.match(/[mpsz][0-9\-=+]+/g);

    if (!groups) return result;

    groups.forEach((group) => {
      const type = group[0];
      const numbers = group.slice(1).match(/[0-9]+|[-+=]/g);

      if (!numbers) return;

      numbers.forEach((item, index) => {
        if (item === "-" || item === "+" || item === "=") {
          if (index > 0 && !isNaN(numbers[index - 1])) {
            result[result.length - 1].yoko = true;
          }
        } else {
          for (let i = 0; i < item.length; i++) {
            result.push({
              yoko: false,
              tile: `${type}${item[i]}`,
              imageUrl: `../assets/images/${type}${item[i]}.png`,
            });
          }
        }
      });
    });

    return result;
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
    defenText: {
      fontSize: 40,
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
      color: "black",
    },
    tileImage: {
      width: 37,
      height: 55,
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
                    {renderDraSelection(baopai, setBaopai)}
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
                    {renderDraSelection(fubaopai, setFubaopai)}
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
                    {renderTileSelection(shoupai, setShoupai)}
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
                    {renderNakiSelection(naki1, setNaki1)}
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
                      {renderNakiSelection(naki2, setNaki2)}
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
                      {renderNakiSelection(naki3, setNaki3)}
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
                      {renderNakiSelection(naki4, setNaki4)}
                    </View>
                  )
                }
              >
                <Text style={styles.selectText}>鳴き牌4: {naki4}</Text>
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
                    {renderTileSelection(rongpai, setRongpai)}
                  </View>
                )
              }
            >
              <Text style={styles.selectText}>アガリ牌: {rongpai}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {renderTileImages(rongpai)}
              </View>
            </TouchableOpacity>

            {/* <TextInput
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
            /> */}

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

        <Portal>
          <Modal
            visible={visibleNaki}
            onDismiss={() => setVisibleNaki(false)}
            contentContainerStyle={styles.modalView}
          >
            {modalContentNaki}
            <Button
              mode="contained"
              onPress={() => setVisibleNaki(false)}
              style={{ marginTop: 16 }}
            >
              閉じる
            </Button>
          </Modal>
        </Portal>

        <Portal>
          <Modal
            visible={visibleHulu}
            onDismiss={() => setVisibleHulu(false)}
            contentContainerStyle={styles.modalView}
          >
            <View style={styles.container}>
              {huluView &&
                huluView.hupai.map((value) => (
                  <Text style={styles.selectText} key={value.name}>
                    {value.name}：{value.fanshu}飜
                  </Text>
                ))}
              {huluView && (
                <Text style={styles.selectText}>{huluView.fu}符</Text>
              )}
              {huluView && (
                <Text style={styles.defenText}>{huluView.defen}点</Text>
              )}
            </View>
            <Button
              mode="contained"
              onPress={() => setVisibleHulu(false)}
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
