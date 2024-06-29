---
tags:
- IPAdapter
- RegionalImageProcessing
---

# Easy Apply IPAdapter (Regional)
## Documentation
- Class name: `easy ipadapterApplyRegional`
- Category: `EasyUse/Adapter`
- Output node: `False`

This node specializes in applying regional adaptations to images using IPAdapter, enhancing or modifying specific areas based on given parameters. It leverages the IPAdapter's capabilities to adjust and refine image content, focusing on regional specificity to achieve desired visual outcomes.
## Input types
### Required
- **`pipe`**
    - Specifies the pipeline configuration to be used, indicating how the image processing should be structured and executed.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `str`
- **`image`**
    - The image to which regional adaptations will be applied, serving as the primary input for the transformation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`positive`**
    - A string parameter used to define positive adjustments or enhancements to be applied to specific regions of the image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative`**
    - A string parameter used to define negative adjustments or modifications to be applied to specific regions of the image, counteracting or balancing the positive enhancements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`image_weight`**
    - Specifies the weight of the image in the adaptation process, influencing the degree to which the image is modified.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`prompt_weight`**
    - Determines the weight of the prompt in the adaptation process, affecting the intensity of the applied changes.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - Defines the type of weighting applied to the adaptations, such as linear or exponential, influencing how adjustments are scaled.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start_at`**
    - Indicates the starting point of the adaptation effect within the image, allowing for gradual application of changes.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - Specifies the endpoint of the adaptation effect within the image, enabling precise control over where modifications cease.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`mask`**
    - An optional parameter that allows for the application of adaptations to specific areas of the image, defined by the mask.
    - Comfy dtype: `MASK`
    - Python dtype: `str`
- **`optional_ipadapter_params`**
    - Optional parameters for further customization of the IPAdapter's behavior, offering additional control over the adaptation process.
    - Comfy dtype: `IPADAPTER_PARAMS`
    - Python dtype: `str`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The modified pipeline configuration after applying regional adaptations, reflecting any changes made during the process.
    - Python dtype: `str`
- **`ipadapter_params`**
    - Comfy dtype: `IPADAPTER_PARAMS`
    - The parameters used or modified within the IPAdapter during the adaptation process, detailing the specific adjustments applied.
    - Python dtype: `str`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The positive embeddings or adjustments generated as a result of the adaptation process, applied to enhance specific regions of the image.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The negative embeddings or adjustments generated, used to counterbalance or modify specific areas of the image in contrast to the positive enhancements.
    - Python dtype: `str`
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
