
# Documentation
- Class name: easy ipadapterApplyRegional
- Category: EasyUse/Adapter
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Easy Apply IPAdapter (Regional)节点专门用于使用IPAdapter对图像进行局部调整，根据给定的参数增强或修改特定区域。它利用IPAdapter的功能来调整和优化图像内容，聚焦于区域特异性以实现预期的视觉效果。

# Input types
## Required
- pipe
    - 指定要使用的管道配置，表明图像处理应如何构建和执行。
    - Comfy dtype: PIPE_LINE
    - Python dtype: str
- image
    - 将进行局部调整的图像，作为转换过程的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: str
- positive
    - 用于定义要应用于图像特定区域的正面调整或增强的字符串参数。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 用于定义要应用于图像特定区域的负面调整或修改的字符串参数，用以抵消或平衡正面增强。
    - Comfy dtype: STRING
    - Python dtype: str
- image_weight
    - 指定图像在调整过程中的权重，影响图像被修改的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- prompt_weight
    - 决定提示在调整过程中的权重，影响应用变化的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - 定义应用于调整的权重类型，如线性或指数，影响调整的缩放方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- start_at
    - 指示调整效果在图像中的起始点，允许逐步应用变化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - 指定调整效果在图像中的终点，实现对修改停止位置的精确控制。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Optional
- mask
    - 可选参数，允许将调整应用于由蒙版定义的图像特定区域。
    - Comfy dtype: MASK
    - Python dtype: str
- optional_ipadapter_params
    - 用于进一步自定义IPAdapter行为的可选参数，提供对调整过程的额外控制。
    - Comfy dtype: IPADAPTER_PARAMS
    - Python dtype: str

# Output types
- pipe
    - Comfy dtype: PIPE_LINE
    - 应用局部调整后的修改管道配置，反映过程中所做的任何更改。
    - Python dtype: str
- ipadapter_params
    - Comfy dtype: IPADAPTER_PARAMS
    - 调整过程中在IPAdapter内使用或修改的参数，详细说明应用的具体调整。
    - Python dtype: str
- positive
    - Comfy dtype: CONDITIONING
    - 调整过程产生的正面嵌入或调整，用于增强图像的特定区域。
    - Python dtype: str
- negative
    - Comfy dtype: CONDITIONING
    - 生成的负面嵌入或调整，用于平衡或修改图像的特定区域，与正面增强形成对比。
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ipadapterApplyRegional(ipadapter):
    def __init__(self):
        super().__init__()
        pass

    @classmethod
    def INPUT_TYPES(cls):
        ipa_cls = cls()
        weight_types = ipa_cls.weight_types
        return {
            "required": {
                "pipe": ("PIPE_LINE",),
                "image": ("IMAGE",),
                "positive": ("STRING", {"default": "", "placeholder": "positive", "multiline": True}),
                "negative": ("STRING", {"default": "", "placeholder": "negative",  "multiline": True}),
                "image_weight": ("FLOAT", {"default": 1.0, "min": -1.0, "max": 3.0, "step": 0.05}),
                "prompt_weight": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.05}),
                "weight_type": (weight_types,),
                "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
            },

            "optional": {
                "mask": ("MASK",),
                "optional_ipadapter_params": ("IPADAPTER_PARAMS",),
            },
            "hidden": {"prompt": "PROMPT", "my_unique_id": "UNIQUE_ID"}
        }

    RETURN_TYPES = ("PIPE_LINE", "IPADAPTER_PARAMS", "CONDITIONING", "CONDITIONING")
    RETURN_NAMES = ("pipe", "ipadapter_params", "positive", "negative")
    CATEGORY = "EasyUse/Adapter"
    FUNCTION = "apply"

    def apply(self, pipe, image, positive, negative, image_weight, prompt_weight, weight_type, start_at, end_at, mask=None, optional_ipadapter_params=None, prompt=None, my_unique_id=None):
        model = pipe['model']
        clip = pipe['clip']
        clip_skip = pipe['loader_settings']['clip_skip']
        a1111_prompt_style = pipe['loader_settings']['a1111_prompt_style']
        pipe_lora_stack = pipe['loader_settings']['lora_stack']
        positive_token_normalization = pipe['loader_settings']['positive_token_normalization']
        positive_weight_interpretation = pipe['loader_settings']['positive_weight_interpretation']
        negative_token_normalization = pipe['loader_settings']['negative_token_normalization']
        negative_weight_interpretation = pipe['loader_settings']['negative_weight_interpretation']
        if positive == '':
            positive = pipe['loader_settings']['positive']
        if negative == '':
            negative = pipe['loader_settings']['negative']

        if not clip:
            raise Exception("No CLIP found")

        positive_embeddings_final, positive_wildcard_prompt, model, clip = prompt_to_cond('positive', model, clip, clip_skip, pipe_lora_stack, positive, positive_token_normalization, positive_weight_interpretation, a1111_prompt_style, my_unique_id, prompt, easyCache)
        negative_embeddings_final, negative_wildcard_prompt, model, clip = prompt_to_cond('negative', model, clip, clip_skip, pipe_lora_stack, negative, negative_token_normalization, negative_weight_interpretation, a1111_prompt_style, my_unique_id, prompt, easyCache)

        #ipadapter regional
        if "IPAdapterRegionalConditioning" not in ALL_NODE_CLASS_MAPPINGS:
            self.error()

        cls = ALL_NODE_CLASS_MAPPINGS["IPAdapterRegionalConditioning"]
        ipadapter_params, new_positive_embeds, new_negative_embeds = cls().conditioning(image, image_weight, prompt_weight, weight_type, start_at, end_at, mask=mask, positive=positive_embeddings_final, negative=negative_embeddings_final)

        if optional_ipadapter_params is not None:
            positive_embeds = pipe['positive'] + new_positive_embeds
            negative_embeds = pipe['negative'] + new_negative_embeds
            _ipadapter_params = {
                "image": optional_ipadapter_params["image"] + ipadapter_params["image"],
                "attn_mask": optional_ipadapter_params["attn_mask"] + ipadapter_params["attn_mask"],
                "weight": optional_ipadapter_params["weight"] + ipadapter_params["weight"],
                "weight_type": optional_ipadapter_params["weight_type"] + ipadapter_params["weight_type"],
                "start_at": optional_ipadapter_params["start_at"] + ipadapter_params["start_at"],
                "end_at": optional_ipadapter_params["end_at"] + ipadapter_params["end_at"],
            }
            ipadapter_params = _ipadapter_params
            del _ipadapter_params
        else:
            positive_embeds = new_positive_embeds
            negative_embeds = new_negative_embeds

        new_pipe = {
            **pipe,
            "positive": positive_embeds,
            "negative": negative_embeds,
        }

        del pipe

        return (new_pipe, ipadapter_params, positive_embeds, negative_embeds)

```
