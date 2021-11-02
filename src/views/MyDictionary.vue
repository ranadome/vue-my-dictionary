<template>
  <div class="dictionary">
    <h1>俺の辞書</h1>
    <form class="add-form">
      <!-- コメント入力フォーム -->
      <div>
        <label>単語</label>
        <input type="text" v-model="newDictionaryItem.word" />
      </div>
      <div>
        <label>かな</label>
        <input type="text" v-model="newDictionaryItem.wordKana" />
      </div>
      <div>
        <label>意味</label>
        <input type="text" v-model="newDictionaryItem.wordMeaning" />
      </div>
      <div>
        <label>リンク</label>
        <input type="text" v-model="newDictionaryItem.link" />
      </div>
      <button @click.prevent="addDictionaryItem">登録</button>

      <!-- 追加ボタンのモック -->
      <!-- <button type="submit">追加</button> -->
      <table>
        <thead>
          <tr>
            <th class="wordId">ID</th>
            <th class="word">単語</th>
            <th class="wordKana">かな</th>
            <th class="wordMeaning">意味</th>
            <th class="link">リンク</th>
            <th class="existenceFlag">存在フラグ</th>
            <th class="insertDate">登録日</th>
            <th class="updateDate">更新日</th>
            <th class="delete"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(myDictionary, index) in dictionaryItems"
            :key="myDictionary.wordId"
          >
            <th>
              <input
                type="text"
                v-model="myDictionary.wordId"
                class="nonBorderText idText"
                readonly
              />
            </th>
            <td>
              <input
                type="text"
                v-model="myDictionary.word"
                class="nonBorderText"
                @change.prevent="updateDictionaryItem(index)"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="myDictionary.wordKana"
                class="nonBorderText"
                @change.prevent="updateDictionaryItem(index)"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="myDictionary.wordMeaning"
                class="nonBorderText"
                @change.prevent="updateDictionaryItem(index)"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="myDictionary.link"
                class="nonBorderText"
                @change.prevent="updateDictionaryItem(index)"
              />
            </td>
            <td>{{ myDictionary.existenceFlag }}</td>
            <td>{{ myDictionary.insertDate }}</td>
            <td>{{ myDictionary.updateDate }}</td>
            <td>
              <button
                @click.prevent="deleteDictionaryItems(myDictionary.wordId)"
              >
                削除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { DictionaryItem, newDictionaryItem } from "@/DictionaryItem";

@Component
export default class App extends Vue {
  private dictionaryItems: DictionaryItem[] = [];
  private newDictionaryItem: newDictionaryItem = {
    word: "",
    wordKana: "",
    wordMeaning: "",
    link: "",
  };

  public async created(): Promise<void> {
    await this.getDictionaryItems();
  }

  private async refresh() {
    await this.getDictionaryItems();
    this.newDictionaryItem = {
      word: "",
      wordKana: "",
      wordMeaning: "",
      link: "",
    };
  }

  private async getDictionaryItems() {
    const res = await axios.get("http://localhost:8080/rest");
    this.dictionaryItems = JSON.parse(JSON.stringify(res.data.dictionary));
  }

  private async addDictionaryItem() {
    await axios.post("http://localhost:8080/rest", this.newDictionaryItem);
    this.refresh();
  }

  private async updateDictionaryItem(index: number) {
    console.log(index);
    await axios.put("http://localhost:8080/rest", this.dictionaryItems[index]);
    this.refresh();
  }

  private async deleteDictionaryItems(wordId: number) {
    await axios.delete("http://localhost:8080/rest/" + wordId);
    this.refresh();
  }
}
</script>

<style>
table {
  border-collapse: collapse;
  color: #333; /* 全体の文字色 */
  background-color: #fff; /* 全体の背景色 */
  margin: 10px auto;
}

th,
td {
  padding: 5px 15px;
  border: solid 1px #a5d1f1;
}

th {
  color: #0d90f3; /* 見出しの文字色 */
  background-color: #d0ebfd; /* 見出しの背景色 */
}

.nonBorderText {
  border: none;
  outline: none;
}

.idText {
  color: #0d90f3; /* 見出しの文字色 */
  background-color: #d0ebfd; /* 見出しの背景色 */
  width: 30px;
  text-align: center;
  font-weight: bold;
}
</style>
