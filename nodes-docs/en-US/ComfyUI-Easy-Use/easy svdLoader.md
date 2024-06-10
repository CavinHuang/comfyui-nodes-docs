---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
---

# EasyLoader (SVD)
## Documentation
- Class name: `easy svdLoader`
- Category: `EasyUse/Loaders`
- Output node: `False`

The `easy svdLoader` node is designed to facilitate the loading of SVD (Singular Value Decomposition) models into the system. It streamlines the process of identifying and retrieving SVD model files from a specified directory, excluding non-relevant files, to ensure that only valid SVD models are loaded for further processing or analysis.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint name for the SVD model to be loaded, filtering the files to identify those relevant to the specified checkpoint.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_name`**
    - Identifies the VAE model to be loaded alongside the SVD model, ensuring compatibility and integration for processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clip_name`**
    - Specifies the CLIP model name to be loaded, which is used for text and image understanding and processing in conjunction with the SVD model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`init_image`**
    - The initial image to be used in the processing pipeline, setting a starting point for model operations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`resolution`**
    - Specifies the resolution for the output image or video, ensuring the processed content meets the desired dimensions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`empty_latent_width`**
    - Defines the width of the empty latent space to be used in the model's processing pipeline.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`empty_latent_height`**
    - Specifies the height of the empty latent space, contributing to the dimensions of the model's output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`video_frames`**
    - Determines the number of frames for video processing, affecting the length and fluidity of the output video.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`motion_bucket_id`**
    - Identifies the motion bucket to be used for video processing, influencing the motion dynamics in the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fps`**
    - Sets the frames per second for the output video, impacting the playback speed and smoothness.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`augmentation_level`**
    - Adjusts the level of augmentation applied to the video or image, affecting the intensity of visual modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`optional_positive`**
    - An optional parameter for specifying positive conditioning aspects, enhancing certain features or attributes in the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`optional_negative`**
    - An optional parameter for defining negative conditioning aspects, suppressing certain features or attributes in the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The pipeline configuration for further processing of the loaded SVD model.
    - Python dtype: `Pipeline`
- **`model`**
    - Comfy dtype: `MODEL`
    - The loaded SVD model ready for use or analysis.
    - Python dtype: `Model`
- **`vae`**
    - Comfy dtype: `VAE`
    - The variational autoencoder associated with the SVD model, if applicable.
    - Python dtype: `VAE`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class svdLoader:

    @classmethod
    def INPUT_TYPES(cls):
        resolution_strings = [f"{width} x {height}" for width, height in BASE_RESOLUTIONS]
        def get_file_list(filenames):
            return [file for file in filenames if file != "put_models_here.txt" and "svd" in file.lower()]

        return {"required": {
                "ckpt_name": (get_file_list(folder_paths.get_filename_list("checkpoints")),),
                "vae_name": (["Baked VAE"] + folder_paths.get_filename_list("vae"),),
                "clip_name": (["None"] + folder_paths.get_filename_list("clip"),),

                "init_image": ("IMAGE",),
                "resolution": (resolution_strings, {"default": "1024 x 576"}),
                "empty_latent_width": ("INT", {"default": 256, "min": 16, "max": MAX_RESOLUTION, "step": 8}),
                "empty_latent_height": ("INT", {"default": 256, "min": 16, "max": MAX_RESOLUTION, "step": 8}),

                "video_frames": ("INT", {"default": 14, "min": 1, "max": 4096}),
                "motion_bucket_id": ("INT", {"default": 127, "min": 1, "max": 1023}),
                "fps": ("INT", {"default": 6, "min": 1, "max": 1024}),
                "augmentation_level": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 10.0, "step": 0.01})
            },
            "optional": {
                "optional_positive": ("STRING", {"default": "", "multiline": True}),
                "optional_negative": ("STRING", {"default": "", "multiline": True}),
            },
            "hidden": {"prompt": "PROMPT", "my_unique_id": "UNIQUE_ID"}
        }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "VAE")
    RETURN_NAMES = ("pipe", "model", "vae")

    FUNCTION = "adv_pipeloader"
    CATEGORY = "EasyUse/Loaders"

    def adv_pipeloader(self, ckpt_name, vae_name, clip_name, init_image, resolution, empty_latent_width, empty_latent_height, video_frames, motion_bucket_id, fps, augmentation_level, optional_positive=None, optional_negative=None, prompt=None, my_unique_id=None):
        model: ModelPatcher | None = None
        vae: VAE | None = None
        clip: CLIP | None = None
        clip_vision = None

        # resolution
        if resolution != "自定义 x 自定义":
            try:
                width, height = map(int, resolution.split(' x '))
                empty_latent_width = width
                empty_latent_height = height
            except ValueError:
                raise ValueError("Invalid base_resolution format.")

        # Clean models from loaded_objects
        easyCache.update_loaded_objects(prompt)

        model, clip, vae, clip_vision = easyCache.load_checkpoint(ckpt_name, "Default", True)

        output = clip_vision.encode_image(init_image)
        pooled = output.image_embeds.unsqueeze(0)
        pixels = comfy.utils.common_upscale(init_image.movedim(-1, 1), empty_latent_width, empty_latent_height, "bilinear", "center").movedim(1, -1)
        encode_pixels = pixels[:, :, :, :3]
        if augmentation_level > 0:
            encode_pixels += torch.randn_like(pixels) * augmentation_level
        t = vae.encode(encode_pixels)
        positive = [[pooled,
                     {"motion_bucket_id": motion_bucket_id, "fps": fps, "augmentation_level": augmentation_level,
                      "concat_latent_image": t}]]
        negative = [[torch.zeros_like(pooled),
                     {"motion_bucket_id": motion_bucket_id, "fps": fps, "augmentation_level": augmentation_level,
                      "concat_latent_image": torch.zeros_like(t)}]]
        if optional_positive is not None and optional_positive != '':
            if clip_name == 'None':
                raise Exception("You need choose a open_clip model when positive is not empty")
            clip = easyCache.load_clip(clip_name)
            positive_embeddings_final, = CLIPTextEncode().encode(clip, optional_positive)
            positive, = ConditioningConcat().concat(positive, positive_embeddings_final)
        if optional_negative is not None and optional_negative != '':
            if clip_name == 'None':
                raise Exception("You need choose a open_clip model when negative is not empty")
            negative_embeddings_final, = CLIPTextEncode().encode(clip, optional_negative)
            negative, = ConditioningConcat().concat(negative, negative_embeddings_final)

        latent = torch.zeros([video_frames, 4, empty_latent_height // 8, empty_latent_width // 8])
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
                                    "batch_size": 1,
                                    "seed": 0,
                                    "empty_samples": samples, }
                }

        return (pipe, model, vae)

```
