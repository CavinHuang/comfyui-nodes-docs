---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
---

# EasyLoader (A1111)
## Documentation
- Class name: `easy a1111Loader`
- Category: `EasyUse/Loaders`
- Output node: `False`

The 'easy a1111Loader' node is designed to simplify the process of loading and configuring models for generation tasks, specifically tailored for use with the a1111 model. It abstracts the complexities involved in setting up the model, including handling various configurations and parameters, to provide an easier and more accessible interface for users.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint name for the model to be loaded, playing a crucial role in determining the exact version of the model that will be used for generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_name`**
    - Defines the name of the VAE (Variational Autoencoder) to be used in conjunction with the model, affecting the quality and characteristics of the generated output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clip_skip`**
    - A flag to skip the CLIP model loading, which can be useful for speeding up the setup process when CLIP is not required for the generation task.
    - Comfy dtype: `INT`
    - Python dtype: `bool`
- **`lora_name`**
    - Specifies the name of the LoRA (Low-Rank Adaptation) to be applied, enhancing the model's capabilities or adjusting its behavior for specific tasks.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_model_strength`**
    - Determines the strength of the LoRA adaptation on the model, allowing for fine-tuning of the model's behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora_clip_strength`**
    - Sets the strength of the LoRA adaptation on the CLIP model, if used, enabling precise control over the influence of CLIP on the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resolution`**
    - Specifies the resolution for the generated output, directly impacting the visual quality and detail of the generated images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`empty_latent_width`**
    - Defines the width of the empty latent space, used in the generation process to influence the aspect ratio and size of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`empty_latent_height`**
    - Sets the height of the empty latent space, affecting the vertical dimension of the generated output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`positive`**
    - The positive prompt input, guiding the model towards generating content that aligns with the described attributes or themes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative`**
    - The negative prompt input, instructing the model to avoid certain attributes or themes in the generated content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`batch_size`**
    - Determines the number of outputs to generate in a single batch, affecting the efficiency and speed of the generation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`optional_lora_stack`**
    - Allows for the inclusion of an optional LoRA stack, further customizing the model's behavior for specific generation tasks.
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `str`
- **`a1111_prompt_style`**
    - A flag to enable a specific prompt style associated with the a1111 model, potentially altering the generation process to suit particular styles or themes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The pipeline configuration resulting from the loading and setup process, ready for generation tasks.
    - Python dtype: `Dict[str, Any]`
- **`model`**
    - Comfy dtype: `MODEL`
    - The loaded and configured model, prepared for use in generation tasks.
    - Python dtype: `ModelPatcher | None`
- **`vae`**
    - Comfy dtype: `VAE`
    - The loaded VAE component, integral to the generation process.
    - Python dtype: `VAE | None`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class a1111Loader:
    @classmethod
    def INPUT_TYPES(cls):
        resolution_strings = [f"{width} x {height}" for width, height in BASE_RESOLUTIONS]
        a1111_prompt_style_default = False
        checkpoints = folder_paths.get_filename_list("checkpoints")
        loras = ["None"] + folder_paths.get_filename_list("loras")
        return {"required": {
            "ckpt_name": (checkpoints,),
            "vae_name": (["Baked VAE"] + folder_paths.get_filename_list("vae"),),
            "clip_skip": ("INT", {"default": -1, "min": -24, "max": 0, "step": 1}),

            "lora_name": (loras,),
            "lora_model_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
            "lora_clip_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

            "resolution": (resolution_strings, {"default": "512 x 512"}),
            "empty_latent_width": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
            "empty_latent_height": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 8}),

            "positive": ("STRING", {"default": "Positive", "multiline": True}),
            "negative": ("STRING", {"default": "Negative", "multiline": True}),
            "batch_size": ("INT", {"default": 1, "min": 1, "max": 64}),
        },
            "optional": {"optional_lora_stack": ("LORA_STACK",), "a1111_prompt_style": ("BOOLEAN", {"default": a1111_prompt_style_default})},
            "hidden": {"prompt": "PROMPT", "my_unique_id": "UNIQUE_ID"}
        }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "VAE")
    RETURN_NAMES = ("pipe", "model", "vae")

    FUNCTION = "adv_pipeloader"
    CATEGORY = "EasyUse/Loaders"

    def adv_pipeloader(self, ckpt_name, vae_name, clip_skip,
                       lora_name, lora_model_strength, lora_clip_strength,
                       resolution, empty_latent_width, empty_latent_height,
                       positive, negative, batch_size, optional_lora_stack=None, a1111_prompt_style=False, prompt=None,
                       my_unique_id=None):

        return fullLoader.adv_pipeloader(self, ckpt_name, 'Default', vae_name, clip_skip,
             lora_name, lora_model_strength, lora_clip_strength,
             resolution, empty_latent_width, empty_latent_height,
             positive, 'mean', 'A1111',
             negative,'mean','A1111',
             batch_size, None, None, None, optional_lora_stack, a1111_prompt_style, prompt,
             my_unique_id
        )

```
