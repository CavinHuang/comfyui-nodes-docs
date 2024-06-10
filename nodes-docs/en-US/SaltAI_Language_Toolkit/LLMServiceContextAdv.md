---
tags:
- LLM
---

# ∞ Service Context (Advanced)
## Documentation
- Class name: `LLMServiceContextAdv`
- Category: `SALT/Language Toolkit/Context`
- Output node: `False`

This node is designed to create an advanced service context for language model operations, incorporating various configurations and parameters to tailor the context to specific needs. It enables fine-tuning of the language model's behavior, including chunk size, overlap, context window, and output specifications, to optimize performance for complex tasks.
## Input types
### Required
- **`llm_model`**
    - Specifies the language model and its embedding model, serving as the foundation for creating the service context. It's crucial for defining the behavior and capabilities of the language model within the service context.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `Dict[str, Any]`
### Optional
- **`llm_embed_model`**
    - Determines the embedding model used alongside the language model, allowing for customization beyond the default setting.
    - Comfy dtype: `LLM_EMBED`
    - Python dtype: `str`
- **`llm_node_parser`**
    - Optional parser for processing language model nodes, providing additional flexibility in handling model outputs.
    - Comfy dtype: `LLM_NODE_PARSER`
    - Python dtype: `Optional[Any]`
- **`enable_chunk_overlap`**
    - Enables overlapping of chunks to ensure continuity and coherence in model outputs, particularly in segmented processing scenarios.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`chunk_overlap`**
    - Specifies the overlap size between chunks, enhancing the model's ability to maintain context across segments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`enable_context_window`**
    - Activates a context window to limit the scope of the model's attention, focusing its analysis and generation on a specified range.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`context_window`**
    - Sets the size of the context window, controlling the amount of text the model considers for each operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`enable_num_output`**
    - Allows setting a limit on the number of outputs the model generates, useful for controlling output volume and detail.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`num_output`**
    - Determines the maximum number of outputs produced by the model, offering control over the model's verbosity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`enable_chunk_size_limit`**
    - Permits the imposition of a maximum chunk size, potentially reducing memory demands and processing time.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`chunk_size_limit`**
    - Defines the maximum allowable chunk size, ensuring that processing demands remain within manageable limits.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`llm_context`**
    - Comfy dtype: `LLM_CONTEXT`
    - The advanced service context created, encapsulating all specified configurations and parameters to customize the language model's operation.
    - Python dtype: `ServiceContext`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMServiceContextAdv:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
            },
            "optional": {
                "llm_embed_model": ("LLM_EMBED",),
                "llm_node_parser": ("LLM_NODE_PARSER",),
                "enable_chunk_overlap": ("BOOLEAN", {"default": True}),
                "chunk_overlap": ("INT", {"default": 50, "min": 0, "max": 100}),
                "enable_context_window": ("BOOLEAN", {"default": True}),
                "context_window": ("INT", {"default": 4096, "min": 2048, "max": 8192}),
                "enable_num_output": ("BOOLEAN", {"default": True}),
                "num_output": ("INT", {"default": 256, "min": 64, "max": 1024}),
                "enable_chunk_size_limit": ("BOOLEAN", {"default": True}),
                "chunk_size_limit": ("INT", {"default": 1024, "min": 512, "max": 2048}),
            },
        }

    RETURN_TYPES = ("LLM_CONTEXT",)
    RETURN_NAMES = ("llm_context",)

    FUNCTION = "context"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Context"

    def context(self, 
        llm_model:Dict[str, Any], 
        llm_embed_model="default", 
        llm_node_parser=None, 
        enable_chunk_size=True, 
        chunk_size=1024, 
        enable_chunk_overlap=True,
        chunk_overlap=50, 
        enable_context_window=True, 
        context_window=4096, 
        enable_num_output=True,
        num_output=256, 
        enable_chunk_size_limit=True,
        chunk_size_limit=1024
    ):
        prompt_helper = None
        if enable_context_window and enable_num_output:
            prompt_helper = PromptHelper(
                context_window=context_window if enable_context_window else None,
                num_output=num_output if enable_num_output else None,
                chunk_overlap_ratio=(chunk_overlap / 100.0) if enable_chunk_overlap else None,
                chunk_size_limit=chunk_size_limit if enable_chunk_size_limit else None,
            )

        service_context = ServiceContext.from_defaults(
                llm=llm_model['llm'],
                prompt_helper=prompt_helper,
                embed_model=llm_embed_model if llm_embed_model != "default" else None,
                node_parser=llm_node_parser,
                chunk_size=chunk_size if enable_chunk_size else None,
                chunk_overlap=chunk_overlap if enable_chunk_overlap else None,
        )
        return (service_context,)

```
