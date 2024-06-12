---
tags:
- Image
- Pipeline
---

# Make Basic Pipe (Inspire)
## Documentation
- Class name: `MakeBasicPipe __Inspire`
- Category: `InspirePack/Prompt`
- Output node: `False`

The MakeBasicPipe __Inspire node is designed to construct a foundational pipeline for creative content generation, integrating various components such as models, encoders, and custom processing logic. It facilitates the seamless combination of text inputs with model-driven transformations, aiming to enhance the creative output through specialized encoding and adaptation techniques.
## Input types
### Required
- **`ckpt_name`**
    - The name of the checkpoint to load for the model, defining the starting point for content generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ckpt_key_opt`**
    - Optional key to specify a particular configuration or variant within the checkpoint, allowing for more tailored content generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`positive_wildcard_text`**
    - Text input for positive prompts, intended to guide the content generation towards specific themes or concepts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_wildcard_text`**
    - Text input for negative prompts, intended to steer the content generation away from certain themes or concepts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Add selection to`**
    - Determines whether the selection is added to the positive or negative prompts, influencing the direction of content generation.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`Select to add LoRA`**
    - Allows selection of a LoRA to add to the text, enhancing the content generation process with additional layers of refinement.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`Select to add Wildcard`**
    - Enables the selection of a wildcard to be added to the text, introducing specific variables or elements into the content generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`wildcard_mode`**
    - Specifies whether the wildcard text is populated dynamically or fixed, affecting how the prompts are generated and used.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`positive_populated_text`**
    - Specifies the text input intended to have a positive influence on the content generation process, affecting the direction and nature of the generated output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_populated_text`**
    - Specifies the text input intended to have a negative influence, guiding the content generation away from certain themes or concepts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`token_normalization`**
    - Indicates whether and how tokens should be normalized during processing, impacting the encoding and subsequent model interactions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`weight_interpretation`**
    - Determines how weights are interpreted in the encoding process, influencing the handling of text inputs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`stop_at_clip_layer`**
    - Specifies the layer of the CLIP model at which processing should stop, affecting the depth of analysis and modification.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - A seed value for initializing random processes, ensuring reproducibility or variability in the content generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`vae_opt`**
    - Optional parameter to specify a variational autoencoder option, enabling further customization of the content generation process.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
## Output types
- **`basic_pipe`**
    - Comfy dtype: `BASIC_PIPE`
    - The constructed foundational pipeline, ready for use in generating creative content based on the specified inputs and configurations.
    - Python dtype: `tuple`
- **`cache_key`**
    - Comfy dtype: `STRING`
    - A unique key associated with the generated pipeline's configuration, facilitating caching and retrieval of the pipeline for future use.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MakeBasicPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),
                        "ckpt_key_opt": ("STRING", {"multiline": False, "placeholder": "If empty, use 'ckpt_name' as the key." }),

                        "positive_wildcard_text": ("STRING", {"multiline": True, "dynamicPrompts": False, 'placeholder': 'Positive Prompt (User Input)'}),
                        "negative_wildcard_text": ("STRING", {"multiline": True, "dynamicPrompts": False, 'placeholder': 'Negative Prompt (User Input)'}),

                        "Add selection to": ("BOOLEAN", {"default": True, "label_on": "Positive", "label_off": "Negative"}),
                        "Select to add LoRA": (["Select the LoRA to add to the text"] + folder_paths.get_filename_list("loras"),),
                        "Select to add Wildcard": (["Select the Wildcard to add to the text"],),
                        "wildcard_mode": ("BOOLEAN", {"default": True, "label_on": "Populate", "label_off": "Fixed"}),

                        "positive_populated_text": ("STRING", {"multiline": True, "dynamicPrompts": False, 'placeholder': 'Populated Positive Prompt (Will be generated automatically)'}),
                        "negative_populated_text": ("STRING", {"multiline": True, "dynamicPrompts": False, 'placeholder': 'Populated Negative Prompt (Will be generated automatically)'}),

                        "token_normalization": (["none", "mean", "length", "length+mean"],),
                        "weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"], {'default': 'comfy++'}),

                        "stop_at_clip_layer": ("INT", {"default": -2, "min": -24, "max": -1, "step": 1}),
            
                        "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    },
                "optional": {
                        "vae_opt": ("VAE",)
                    },
                }

    CATEGORY = "InspirePack/Prompt"

    RETURN_TYPES = ("BASIC_PIPE", "STRING")
    RETURN_NAMES = ("basic_pipe", "cache_key")
    FUNCTION = "doit"

    def doit(self, **kwargs):
        pos_populated = kwargs['positive_populated_text']
        neg_populated = kwargs['negative_populated_text']

        clip_encoder = BNK_EncoderWrapper(kwargs['token_normalization'], kwargs['weight_interpretation'])

        if 'ImpactWildcardEncode' not in nodes.NODE_CLASS_MAPPINGS:
            utils.try_install_custom_node('https://github.com/ltdrdata/ComfyUI-Impact-Pack',
                                          "To use 'Make Basic Pipe (Inspire)' node, 'Impact Pack' extension is required.")
            raise Exception(f"[ERROR] To use 'Make Basic Pipe (Inspire)', you need to install 'Impact Pack'")

        model, clip, vae, key = CheckpointLoaderSimpleShared().doit(ckpt_name=kwargs['ckpt_name'], key_opt=kwargs['ckpt_key_opt'])
        clip = nodes.CLIPSetLastLayer().set_last_layer(clip, kwargs['stop_at_clip_layer'])[0]
        model, clip, positive = nodes.NODE_CLASS_MAPPINGS['ImpactWildcardEncode'].process_with_loras(wildcard_opt=pos_populated, model=model, clip=clip, clip_encoder=clip_encoder)
        model, clip, negative = nodes.NODE_CLASS_MAPPINGS['ImpactWildcardEncode'].process_with_loras(wildcard_opt=neg_populated, model=model, clip=clip, clip_encoder=clip_encoder)

        if 'vae_opt' in kwargs:
            vae = kwargs['vae_opt']

        basic_pipe = model, clip, vae, positive, negative

        return (basic_pipe, key)

```
