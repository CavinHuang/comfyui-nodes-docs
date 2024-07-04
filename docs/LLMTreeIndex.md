
# Documentation
- Class name: LLMTreeIndex
- Category: SALT/Language Toolkit/Indexing
- Output node: False

LLMTreeIndex节点旨在从一组语言模型节点构建索引结构，以便高效查询和检索信息。它通过控制树的深度和广度的参数来支持索引过程的自定义，并提供包含额外上下文的选项，以实现更精细的索引。

# Input types
## Required
- llm_model
    - 指定用于索引的语言模型，作为构建树索引的基础。
    - Comfy dtype: LLM_MODEL
    - Python dtype: str
- llm_nodes
    - 定义要索引的节点集，代表树索引将组织和使之可搜索的数据结构。
    - Comfy dtype: LLM_NODES
    - Python dtype: list

## Optional
- service_context
    - 可选的上下文，用于根据特定服务需求定制索引过程，提高索引的相关性。
    - Comfy dtype: LLM_CONTEXT
    - Python dtype: str
- num_children
    - 确定树中每个节点可以拥有的最大子节点数，影响树的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- build_tree
    - 控制是否应构建树结构的标志，允许灵活地生成索引。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- llm_index
    - 生成的索引结构，针对指定语言模型上下文中的高效查询和检索进行了优化。
    - Comfy dtype: LLM_INDEX
    - Python dtype: TreeIndex


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMTreeIndex:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "llm_nodes": ("LLM_NODES",),
            },
            "optional": {
                "service_context": ("LLM_CONTEXT",),
                "num_children": ("INT", {"default": 10}),
                "build_tree": ("BOOLEAN", {"default": True}),
            },
        }

    RETURN_TYPES = ("LLM_INDEX",)
    RETURN_NAMES = ("llm_index",)

    FUNCTION = "index"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Indexing"

    def index(self, llm_model, llm_nodes, service_context=None, num_children=10, build_tree=True):
        index = TreeIndex(
            nodes=llm_nodes,
            num_children=num_children,
            build_tree=build_tree,
            use_async=False,
            show_progress=True,
            service_context=service_context,
        )
        return (index,)

```
