# ∞ Tree Index
## Documentation
- Class name: `LLMTreeIndex`
- Category: `SALT/Language Toolkit/Indexing`
- Output node: `False`

The LLMTreeIndex node is designed to construct an index structure from a set of language model nodes, facilitating efficient querying and retrieval of information. It supports customization of the indexing process through parameters that control the depth and breadth of the tree, as well as the option to include additional context for more nuanced indexing.
## Input types
### Required
- **`llm_model`**
    - Specifies the language model to be used for indexing, serving as the foundation for constructing the tree index.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `str`
- **`llm_nodes`**
    - Defines the set of nodes to be indexed, representing the data structure that the tree index will organize and make searchable.
    - Comfy dtype: `LLM_NODES`
    - Python dtype: `list`
### Optional
- **`service_context`**
    - Optional context provided to tailor the indexing process to specific service requirements, enhancing the relevance of the index.
    - Comfy dtype: `LLM_CONTEXT`
    - Python dtype: `str`
- **`num_children`**
    - Determines the maximum number of child nodes each node in the tree can have, influencing the tree's breadth.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`build_tree`**
    - Flag to control whether the tree structure should be constructed, allowing for flexibility in how the index is generated.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`llm_index`**
    - Comfy dtype: `LLM_INDEX`
    - The resulting index structure, optimized for efficient querying and retrieval within the specified language model context.
    - Python dtype: `TreeIndex`
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
