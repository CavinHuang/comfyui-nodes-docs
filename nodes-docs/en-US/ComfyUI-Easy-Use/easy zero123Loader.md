---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
---

# EasyLoader (Zero123)
## Documentation
- Class name: `easy zero123Loader`
- Category: `EasyUse/Loaders`
- Output node: `False`

The `easy zero123Loader` node is designed to simplify the process of loading and configuring 3D models for generation tasks. It abstracts away the complexities involved in setting up 3D model parameters, making it easier for users to generate 3D content with specific attributes and configurations.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint name for the model to be loaded, serving as a key identifier for retrieving the correct model configuration.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_name`**
    - Identifies the VAE model to be used in conjunction with the main model, facilitating specific generative tasks.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`init_image`**
    - Defines the initial image to be used as a basis for generation, setting a starting point for the model's output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`empty_latent_width`**
    - Defines the width of the latent space for the 3D model, affecting the resolution and detail of the generated 3D content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`empty_latent_height`**
    - Defines the height of the latent space for the 3D model, affecting the resolution and detail of the generated 3D content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_size`**
    - Determines the number of 3D content pieces to generate in a single batch, allowing for efficient bulk generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`elevation`**
    - Specifies the elevation angle for the 3D model generation, influencing the vertical orientation of the generated content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`azimuth`**
    - Specifies the azimuth angle for the 3D model generation, influencing the horizontal orientation of the generated content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Returns the pipeline configuration used for generating the 3D content, encapsulating the sequence of operations performed.
    - Python dtype: `str`
- **`model`**
    - Comfy dtype: `MODEL`
    - Provides the loaded model after applying the specified configurations, ready for generating 3D content.
    - Python dtype: `str`
- **`vae`**
    - Comfy dtype: `VAE`
    - Returns the VAE model used in the generation process, highlighting its role in shaping the final output.
    - Python dtype: `str`
- **`ui`**
    - Provides a user interface component for inputting positive and negative prompts, facilitating an interactive and user-friendly way to configure the 3D model generation process.
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class zero123Loader:

    @classmethod
    def INPUT_TYPES(cls):
        def get_file_list(filenames):
            return [file for file in filenames if file != "put_models_here.txt" and "zero123" in file.lower()]

        return {"required": {
            "ckpt_name": (get_file_list(folder_paths.get_filename_list("checkpoints")),),
            "vae_name": (["Baked VAE"] + folder_paths.get_filename_list("vae"),),

            "init_image": ("IMAGE",),
            "empty_latent_width": ("INT", {"default": 256, "min": 16, "max": MAX_RESOLUTION, "step": 8}),
            "empty_latent_height": ("INT", {"default": 256, "min": 16, "max": MAX_RESOLUTION, "step": 8}),

            "batch_size": ("INT", {"default": 1, "min": 1, "max": 64}),

            "elevation": ("FLOAT", {"default": 0.0, "min": -180.0, "max": 180.0}),
            "azimuth": ("FLOAT", {"default": 0.0, "min": -180.0, "max": 180.0}),
        },
            "hidden": {"prompt": "PROMPT", "my_unique_id": "UNIQUE_ID"}
        }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "VAE")
    RETURN_NAMES = ("pipe", "model", "vae")

    FUNCTION = "adv_pipeloader"
    CATEGORY = "EasyUse/Loaders"

    def adv_pipeloader(self, ckpt_name, vae_name, init_image, empty_latent_width, empty_latent_height, batch_size, elevation, azimuth, prompt=None, my_unique_id=None):
        model: ModelPatcher | None = None
        vae: VAE | None = None
        clip: CLIP | None = None
        clip_vision = None

        # Clean models from loaded_objects
        easyCache.update_loaded_objects(prompt)

        model, clip, vae, clip_vision = easyCache.load_checkpoint(ckpt_name, "Default", True)

        output = clip_vision.encode_image(init_image)
        pooled = output.image_embeds.unsqueeze(0)
        pixels = comfy.utils.common_upscale(init_image.movedim(-1, 1), empty_latent_width, empty_latent_height, "bilinear", "center").movedim(1, -1)
        encode_pixels = pixels[:, :, :, :3]
        t = vae.encode(encode_pixels)
        cam_embeds = camera_embeddings(elevation, azimuth)
        cond = torch.cat([pooled, cam_embeds.repeat((pooled.shape[0], 1, 1))], dim=-1)

        positive = [[cond, {"concat_latent_image": t}]]
        negative = [[torch.zeros_like(pooled), {"concat_latent_image": torch.zeros_like(t)}]]
        latent = torch.zeros([batch_size, 4, empty_latent_height // 8, empty_latent_width // 8])
        samples = {"samples": latent}

        image = easySampler.pil2tensor(Image.new('RGB', (1, 1), (0, 0, 0)))

        pipe = {"model": model,
                "positive": positive,
                "negative": negative,
                "vae": vae,
                "clip": clip,

                "samples": samples,
                "images": image,
                "seed": 0,

                "loader_settings": {"ckpt_name": ckpt_name,
                                    "vae_name": vae_name,

                                    "positive": positive,
                                    "positive_l": None,
                                    "positive_g": None,
                                    "positive_balance": None,
                                    "negative": negative,
                                    "negative_l": None,
                                    "negative_g": None,
                                    "negative_balance": None,
                                    "empty_latent_width": empty_latent_width,
                                    "empty_latent_height": empty_latent_height,
                                    "batch_size": batch_size,
                                    "seed": 0,
                                    "empty_samples": samples, }
                }

        return (pipe, model, vae)

```
