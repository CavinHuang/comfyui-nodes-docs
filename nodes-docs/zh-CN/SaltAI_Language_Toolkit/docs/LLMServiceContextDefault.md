
# Documentation
- Class name: LLMServiceContextDefault
- Category: SALT/Language Toolkit/Context
- Output node: False

该节点旨在为语言模型操作生成服务上下文，封装必要的配置和设置，以便于与语言模型进行交互。

# Input types
## Required
- llm_model
    - 指定要使用的语言模型及其嵌入模型，决定后续语言处理任务的操作环境。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Dict[str, Any]

# Output types
- llm_context
    - 提供生成的服务上下文，实现与指定语言模型的定制化交互。
    - Comfy dtype: LLM_CONTEXT
    - Python dtype: Tuple[ServiceContext]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMServiceContextDefault:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
            },
        }

    RETURN_TYPES = ("LLM_CONTEXT",)
    RETURN_NAMES = ("llm_context",)

    FUNCTION = "context"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Context"

    def context(self, llm_model: Dict[str, Any]):
        service_context = ServiceContext.from_defaults(
            llm=llm_model['llm'],
            embed_model=llm_model['embed_model'],
        )
        return (service_context,)

```
