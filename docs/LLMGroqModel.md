
# Documentation
- Class name: `LLMGroqModel`
- Category: `SALT/Language Toolkit/Loaders`
- Output node: `False`

LLMGroqModel节点旨在与Groq平台对接，用于加载和管理语言模型。它封装了初始化语言模型及其对应嵌入模型的功能，为将Groq的AI能力整合到各种应用中提供了一个流畅的过程。

# Input types
## Required
- **`model`**
    - 指定要加载的语言模型的名称。该参数对于确定在操作过程中将使用Groq平台的哪个特定模型至关重要。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`groq_api_key`**
    - 用于在Groq平台上进行身份验证的API密钥。该密钥可以安全地访问Groq的服务，对节点的操作至关重要。
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`embedding_model`**
    - 定义与语言模型一起使用的嵌入模型的名称。这个参数对于需要文本语义理解的任务很重要，比如相似度搜索或文本分类。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Optional
- **`openai_api_key`**
    - OpenAI服务的可选API密钥，在嵌入模型基于OpenAI技术时使用。
    - Comfy dtype: `STRING`
    - Python dtype: `str`

# Output types
- **`llm_model`**
    - 返回初始化后的语言模型，包括其配置和状态，可直接用于各种应用。
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `Dict[str, Any]`
- **`embed_model_only`**
    - 单独提供初始化后的嵌入模型，包括其名称，用于需要文本语义分析的任务。
    - Comfy dtype: `LLM_EMBED_MODEL`
    - Python dtype: `Dict[str, Any]`


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMGroq:
    """
    @Documentation: https://docs.llamaindex.ai/en/stable/api_reference/llms/groq/
    """
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": (["llama3-8b-8192", "llama3-70b-8192", "mixtral-8x7b-32768", "gemma-7b-it"],),
                "groq_api_key": ("STRING", {
                    "multiline": False,
                    "dynamicPrompts": False,
                    "default": os.environ.get("GROQ_API_KEY", "")
                }),
                "embedding_model": (
                    sorted([x.value for x in OpenAIEmbeddingModelType]),
                    {"default": "text-embedding-ada-002"},
                ),
            },
            "optional": {
                "openai_api_key": ("STRING", {
                    "multiline": False,
                    "dynamicPrompts": False,
                    "default": os.environ.get("OPENAI_API_KEY", "")
                }),
            }
        }

    RETURN_TYPES = ("LLM_MODEL", "LLM_EMBED_MODEL")
    RETURN_NAMES = ("llm_model", "embed_model_only")

    FUNCTION = "load_model"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Loaders"

    def load_model(self, model: str, groq_api_key: str, embedding_model:str, openai_api_key:str = None) -> Dict[str, Any]:
        llm = Groq(model=model, api_key=groq_api_key)
        embed_model = OpenAIEmbedding(model_name=embedding_model, api_key=openai_api_key,)
        return ({"llm": llm, "llm_name": model, "embed_model": embed_model, "embed_name": embedding_model}, {"embed_model": embed_model, "embed_name": embedding_model})

```
