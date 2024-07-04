
# Documentation
- Class name: LLMOpenAIModelOpts
- Category: SALT/Language Toolkit/Loaders/Options
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LLMOpenAIModelOpts节点提供了一个全面的接口，用于配置各种语言模型的选项，包括OpenAI的模型。它允许用户微调模型参数，如温度、令牌限制和API重试限制，以及嵌入模型设置，如批处理大小和维度。该节点旨在为语言模型的使用提供灵活的设置，以满足文本生成和嵌入任务的特定需求。

# Input types
## Required
- llm_model
    - 未知参数，可能是指定要使用的语言模型。
    - Comfy dtype: LLM_MODEL
    - Python dtype: unknown

## Optional
- model_temperature
    - 指定语言模型的温度，影响输出的随机性。较低的值会产生更确定性的输出，而较高的值会增加创造性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- model_max_tokens
    - 定义语言模型在单个响应中可以生成的最大令牌数，设置输出长度的限制。
    - Comfy dtype: INT
    - Python dtype: int
- model_api_max_retries
    - 确定在API调用失败时最大重试次数，确保在网络条件不佳时的稳健性。
    - Comfy dtype: INT
    - Python dtype: int
- model_api_timeout
    - 设置API调用的超时时间，确保进程不会无限期挂起。
    - Comfy dtype: INT
    - Python dtype: int
- model_reuse_anyscale_client
    - 指示是否在多个请求中重用Anyscale客户端，优化资源利用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- multimodal_max_new_tokens
    - 指定多模态输入的最大新令牌数，适用于支持多模态数据的模型。
    - Comfy dtype: INT
    - Python dtype: int
- multimodal_image_detail
    - 确定多模态输入中图像的详细程度，可能的值为'low'、'high'或'auto'，影响模型对视觉数据的处理。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- embed_batch_size
    - 设置处理嵌入的批处理大小，影响性能和资源使用。
    - Comfy dtype: INT
    - Python dtype: int
- embed_dimensions
    - 指定嵌入的维度，影响向量表示的粒度。
    - Comfy dtype: INT
    - Python dtype: int
- embed_api_max_retries
    - 确定嵌入API调用的最大重试次数，确保在网络条件不佳时的可靠性。
    - Comfy dtype: INT
    - Python dtype: int
- embed_api_timeout
    - 设置嵌入API调用的超时时间，防止无限期挂起。
    - Comfy dtype: INT
    - Python dtype: int
- embed_reuse_anyscale_client
    - 指示是否重用Anyscale客户端进行嵌入操作，优化资源效率。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- model_additional_kwargs
    - 允许向模型传递额外的关键字参数，提供扩展定制。
    - Comfy dtype: STRING
    - Python dtype: Dict[str, Any]
- embed_additional_kwargs
    - 允许为嵌入操作提供额外的关键字参数，提供进一步的自定义选项。
    - Comfy dtype: STRING
    - Python dtype: Dict[str, Any]
- model_system_prompt
    - 定义一个系统级提示，可用于指导模型的生成过程，提供了一种影响输出上下文或方向的方式。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- model
    - 包含更新后的语言模型和嵌入模型对象的字典，反映了应用的配置选项。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMOpenAIModelOpts:
    """
    Sets various options for the model, and embedding.
    """
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
            },
            "optional": {
                "model_temperature": ("FLOAT", {"min": 0, "max": 1.0, "default": DEFAULT_TEMPERATURE, "step": 0.001}),
                "model_max_tokens": ("INT", {"min": 8, "default": 4096}),
                "model_api_max_retries": ("INT", {"min": 1, "max": 12, "default": 3}),
                "model_api_timeout": ("INT", {"min": 8, "max": 120, "default": 60}),
                "model_reuse_anyscale_client": ("BOOLEAN", {"default": True}),
                
                "multimodal_max_new_tokens": ("INT", {"min": 8, "default": 300}),
                "multimodal_image_detail": (["low", "high", "auto"],),

                "embed_batch_size": ("INT", {"min": 8, "default": DEFAULT_EMBED_BATCH_SIZE}),
                "embed_dimensions": ("INT", {"min": 1, "default": DEFAULT_EMBEDDING_DIM}),
                "embed_api_max_retries": ("INT", {"min": 1, "max": 12, "default": 3}),
                "embed_api_timeout": ("INT", {"min": 8, "max": 120, "default": 60}),
                "embed_reuse_anyscale_client": ("BOOLEAN", {"default": True}),
                
                "model_additional_kwargs": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "", "placeholder": "Additional model kwargs JSON"}),
                "embed_additional_kwargs": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "", "placeholder": "Additional embed kwargs JSON"}),
                "model_system_prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "System directions, or rules to follow globally across nodes."}),
            }
        }

    RETURN_TYPES = ("LLM_MODEL", )
    RETURN_NAMES = ("model", )

    FUNCTION = "set_options"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Loaders/Options"

    def set_options(self, llm_model:Dict[str, Any], **kwargs) -> Dict[str, Any]:
        llm = llm_model['llm']
        embed = llm_model['embed_model']
        
        # LLM Options
        llm.temperature = kwargs.get("model_temperature", DEFAULT_TEMPERATURE)
        llm.max_retries = kwargs.get("model_api_max_retries", 3)
        llm.reuse_client = kwargs.get("model_reuse_anyscale_client", True)
        llm.additional_kwargs = json.loads(kwargs.get("model_additional_kwargs", {}).strip()) if kwargs.get("model_additional_kwargs", {}).strip() != "" else {} # Default to `None` if empty string
        llm.system_prompt = kwargs.get("model_system_prompt", None)

        # Embed Options
        embed.embed_batch_size = kwargs.get("embed_batch_size", DEFAULT_EMBED_BATCH_SIZE)
        embed.dimensions = kwargs.get("embed_dimensions", DEFAULT_EMBEDDING_DIM) if kwargs.get("embed_dimensions", DEFAULT_EMBEDDING_DIM) > 0 else None # Default to `None` if not above 0
        embed.additional_kwargs = json.loads(kwargs.get("embed_additional_kwargs", {}).strip()) if kwargs.get("embed_additional_kwargs", "").strip() != "" else {} # Default to `None` if empty string
        embed.max_retries = kwargs.get("embed_api_max_retries", 3)
        embed.timeout = kwargs.get("embed_api_timeout", 60)
        embed.reuse_client = kwargs.get("embed_reuse_anyscale_client", True)

        if isinstance(llm, OpenAIMultiModal):
            llm.max_new_tokens = kwargs.get("multimodal_max_new_tokens", 300)
            llm.image_detail = kwargs.get("multimodal_image_detail", "low")
        else:
            llm.max_tokens = kwargs.get("model_max_tokens", 4096)

        llm_model['llm'] = llm
        llm_model['embed_model'] = embed

        return (llm_model,)

```
