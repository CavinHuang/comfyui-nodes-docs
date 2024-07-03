
# Documentation
- Class name: LLMServiceContextAdv
- Category: SALT/Language Toolkit/Context
- Output node: False

LLMServiceContextAdv节点旨在为语言模型操作创建一个高级服务上下文，整合各种配置和参数以满足特定需求。它能够对语言模型的行为进行微调，包括块大小、重叠度、上下文窗口和输出规格等，以优化复杂任务的性能。

# Input types
## Required
- llm_model
    - 指定语言模型及其嵌入模型，作为创建服务上下文的基础。对于定义服务上下文中语言模型的行为和能力至关重要。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Dict[str, Any]
## Optional
- llm_embed_model
    - 确定与语言模型一起使用的嵌入模型，允许超出默认设置的自定义。
    - Comfy dtype: LLM_EMBED
    - Python dtype: str
- llm_node_parser
    - 可选的语言模型节点解析器，为处理模型输出提供额外的灵活性。
    - Comfy dtype: LLM_NODE_PARSER
    - Python dtype: Optional[Any]
- enable_chunk_overlap
    - 启用块重叠以确保模型输出的连续性和一致性，特别是在分段处理场景中。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- chunk_overlap
    - 指定块之间的重叠大小，增强模型在各段之间保持上下文的能力。
    - Comfy dtype: INT
    - Python dtype: int
- enable_context_window
    - 激活上下文窗口以限制模型注意力的范围，将其分析和生成集中在指定范围内。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- context_window
    - 设置上下文窗口的大小，控制模型在每次操作中考虑的文本量。
    - Comfy dtype: INT
    - Python dtype: int
- enable_num_output
    - 允许设置模型生成输出的数量限制，用于控制输出量和细节。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- num_output
    - 确定模型产生的最大输出数量，提供对模型详细程度的控制。
    - Comfy dtype: INT
    - Python dtype: int
- enable_chunk_size_limit
    - 允许施加最大块大小限制，可能减少内存需求和处理时间。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- chunk_size_limit
    - 定义允许的最大块大小，确保处理需求保持在可管理的范围内。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- llm_context
    - 创建的高级服务上下文，封装所有指定的配置和参数，以定制语言模型的操作。
    - Comfy dtype: LLM_CONTEXT
    - Python dtype: ServiceContext


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
