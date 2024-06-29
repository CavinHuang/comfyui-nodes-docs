---
tags:
- Prompt
- Text
- Wildcard
---

# Wildcard Encode (Inspire)
## Documentation
- Class name: `WildcardEncode __Inspire`
- Category: `InspirePack/Prompt`
- Output node: `False`

The 'WildcardEncode __Inspire' node is designed to process and enhance text prompts through sophisticated encoding techniques, leveraging external models or custom algorithms. It focuses on refining the quality and specificity of generated content by applying advanced text manipulation strategies.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for encoding. It is a critical component that determines the effectiveness of the encoding process.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Refers to the CLIP model used alongside the primary model to enhance the encoding process. It plays a vital role in interpreting and processing the text.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`token_normalization`**
    - Defines the method for token normalization, affecting how text inputs are processed and encoded. It influences the encoding's adaptability to different text lengths and complexities.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`weight_interpretation`**
    - Determines how weights are interpreted during the encoding process, impacting the final encoded output's quality and relevance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`wildcard_text`**
    - The text input that will be encoded. This parameter is central to the node's operation, directly influencing the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`populated_text`**
    - The result of populating the wildcard text, automatically generated based on the encoding process. It reflects the enhanced version of the input text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`mode`**
    - Controls whether the text is populated dynamically or fixed, affecting how the wildcard text is processed and encoded.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`Select to add LoRA`**
    - Allows selection of a LoRA to add to the text, enhancing the encoding with specific characteristics or effects.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`Select to add Wildcard`**
    - Enables the addition of a predefined wildcard to the text, further customizing the encoding process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - The seed value for random processes within the encoding, ensuring reproducibility and consistency in the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The model after being processed and potentially modified by the encoding.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The CLIP model after being processed and potentially modified by the encoding.
    - Python dtype: `torch.nn.Module`
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The conditioning information generated as a result of the encoding process, used to guide the generation.
    - Python dtype: `str`
- **`populated_text`**
    - Comfy dtype: `STRING`
    - The final populated text after encoding, representing the enhanced and refined output.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WildcardEncodeInspire:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "model": ("MODEL",),
                        "clip": ("CLIP",),
                        "token_normalization": (["none", "mean", "length", "length+mean"], ),
                        "weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"], {'default': 'comfy++'}),
                        "wildcard_text": ("STRING", {"multiline": True, "dynamicPrompts": False, 'placeholder': 'Wildcard Prompt (User Input)'}),
                        "populated_text": ("STRING", {"multiline": True, "dynamicPrompts": False, 'placeholder': 'Populated Prompt (Will be generated automatically)'}),
                        "mode": ("BOOLEAN", {"default": True, "label_on": "Populate", "label_off": "Fixed"}),
                        "Select to add LoRA": (["Select the LoRA to add to the text"] + folder_paths.get_filename_list("loras"), ),
                        "Select to add Wildcard": (["Select the Wildcard to add to the text"],),
                        "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    },
                }

    CATEGORY = "InspirePack/Prompt"

    RETURN_TYPES = ("MODEL", "CLIP", "CONDITIONING", "STRING")
    RETURN_NAMES = ("model", "clip", "conditioning", "populated_text")
    FUNCTION = "doit"

    def doit(self, *args, **kwargs):
        populated = kwargs['populated_text']

        clip_encoder = BNK_EncoderWrapper(kwargs['token_normalization'], kwargs['weight_interpretation'])

        if 'ImpactWildcardEncode' not in nodes.NODE_CLASS_MAPPINGS:
            utils.try_install_custom_node('https://github.com/ltdrdata/ComfyUI-Impact-Pack',
                                          "To use 'Wildcard Encode (Inspire)' node, 'Impact Pack' extension is required.")
            raise Exception(f"[ERROR] To use 'Wildcard Encode (Inspire)', you need to install 'Impact Pack'")

        model, clip, conditioning = nodes.NODE_CLASS_MAPPINGS['ImpactWildcardEncode'].process_with_loras(wildcard_opt=populated, model=kwargs['model'], clip=kwargs['clip'], clip_encoder=clip_encoder)
        return (model, clip, conditioning, populated)

```
