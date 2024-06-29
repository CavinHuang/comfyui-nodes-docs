---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
---

# EasyLoader (Comfy)
## Documentation
- Class name: `easy comfyLoader`
- Category: `EasyUse/Loaders`
- Output node: `False`

The `easy comfyLoader` node is designed to simplify the process of loading and configuring models for image generation tasks. It abstracts the complexities involved in setting up models, including checkpoint selection and resolution adjustments, making it easier for users to initiate and customize their image generation workflows.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint name for the model to be loaded, playing a crucial role in determining the model's behavior and output quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_name`**
    - Selects the VAE model to be used, impacting the style and characteristics of the generated images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clip_skip`**
    - Determines the number of CLIP model layers to skip, adjusting the influence of CLIP on the generation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`lora_name`**
    - Specifies the LoRA model to be used, allowing for fine-tuned control over the generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_model_strength`**
    - Sets the strength of the LoRA model adjustments, modifying the impact on the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora_clip_strength`**
    - Defines the strength of CLIP adjustments when using a LoRA model, influencing the final image output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resolution`**
    - Defines the resolution for the generated images, allowing users to customize the output size according to their requirements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`empty_latent_width`**
    - Specifies the width of the empty latent space, affecting the dimensions of the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`empty_latent_height`**
    - Specifies the height of the empty latent space, impacting the dimensions of the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`positive`**
    - A positive prompt that guides the image generation towards desired themes or concepts, influencing the creative direction of the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative`**
    - A negative prompt used to steer the image generation away from certain themes or concepts, refining the output by excluding undesired elements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`batch_size`**
    - Determines the number of images to be generated in a single batch, affecting the efficiency and speed of the image generation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`optional_lora_stack`**
    - Optionally includes a Lora stack configuration to further customize the model's behavior, offering advanced control over the generation process.
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `str`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Provides the pipeline configuration for image generation, integrating various models and settings.
    - Python dtype: `Dict[str, Any]`
- **`model`**
    - Comfy dtype: `MODEL`
    - Returns the main model used in the generation process, configured according to the specified parameters.
    - Python dtype: `Any`
- **`vae`**
    - Comfy dtype: `VAE`
    - Returns the VAE model used, reflecting the chosen settings for style and characteristics of the generated images.
    - Python dtype: `Any`
- **`ui`**
    - Generates a user interface component displaying the positive and negative wildcard prompts, enhancing user interaction with the model's output.
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class comfyLoader:
    @classmethod
    def INPUT_TYPES(cls):
        resolution_strings = [f"{width} x {height}" for width, height in BASE_RESOLUTIONS]
        return {"required": {
            "ckpt_name": (folder_paths.get_filename_list("checkpoints"),),
            "vae_name": (["Baked VAE"] + folder_paths.get_filename_list("vae"),),
            "clip_skip": ("INT", {"default": -1, "min": -24, "max": 0, "step": 1}),

            "lora_name": (["None"] + folder_paths.get_filename_list("loras"),),
            "lora_model_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
            "lora_clip_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

            "resolution": (resolution_strings, {"default": "512 x 512"}),
            "empty_latent_width": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
            "empty_latent_height": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 8}),

            "positive": ("STRING", {"default": "Positive", "multiline": True}),
            "negative": ("STRING", {"default": "Negative", "multiline": True}),

            "batch_size": ("INT", {"default": 1, "min": 1, "max": 64}),
        },
            "optional": {"optional_lora_stack": ("LORA_STACK",)},
            "hidden": {"prompt": "PROMPT", "my_unique_id": "UNIQUE_ID"}}

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "VAE")
    RETURN_NAMES = ("pipe", "model", "vae")

    FUNCTION = "adv_pipeloader"
    CATEGORY = "EasyUse/Loaders"

    def adv_pipeloader(self, ckpt_name, vae_name, clip_skip,
                       lora_name, lora_model_strength, lora_clip_strength,
                       resolution, empty_latent_width, empty_latent_height,
                       positive, negative, batch_size, optional_lora_stack=None, prompt=None,
                      my_unique_id=None):
        return fullLoader.adv_pipeloader(self, ckpt_name, 'Default', vae_name, clip_skip,
             lora_name, lora_model_strength, lora_clip_strength,
             resolution, empty_latent_width, empty_latent_height,
             positive, 'none', 'comfy',
             negative, 'none', 'comfy',
             batch_size, None, None, None, optional_lora_stack, False, prompt,
             my_unique_id
         )

```
