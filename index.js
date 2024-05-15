const axios = require('axios');
const fs = require('fs');
const path = require('path');

// https://workflow.esheep.com/object_info

const getObjects = async () => {
  const response = await axios.default.get('https://workflow.esheep.com/object_info');
  return response.data;
}

// https://workflow.esheep.com/documents/query_node?node_name=CheckpointNameSelector
const getDocuments = async (node_name) => {
  const response = await axios.default.get(`https://workflow.esheep.com/documents/query_node?node_name=${node_name}`);
  return response.data;
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 保存文档数据
const saveDocuments = async () => {
  try {
    const allObjects = await getObjects();
    const objectKeys = Object.keys(allObjects);
    console.log("🚀 ~ saveDocuments ~ objectKeys:", objectKeys)

    const getDocAndSave = async (objectKey) => {
      const documents = await getDocuments(objectKey);
      console.log("🚀 ~ saveDocuments ~ documents:", documents)
      const savePath = path.join(__dirname, 'docs', `${objectKey}.md`);
      fs.writeFileSync(savePath, documents.data.doc)
      await sleep(1000);
      return documents;
    }

    // 队列请求获取，一个请求完成后再进行下一个请求
    for (let i = 0; i < objectKeys.length; i++) {
      await getDocAndSave(objectKeys[i]);
    }


  } catch (error) {
    
  }
}

saveDocuments().then(data => console.log(data));