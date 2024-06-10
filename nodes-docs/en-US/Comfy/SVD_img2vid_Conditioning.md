---
tags:
- Conditioning
---

# SVD_img2vid_Conditioning
## Documentation
- Class name: `SVD_img2vid_Conditioning`
- Category: `conditioning/video_models`
- Output node: `False`

This node is designed for generating conditioning data for video generation tasks, specifically tailored for use with SVD_img2vid models. It takes various inputs including initial images, video parameters, and a VAE model to produce conditioning data that can be used to guide the generation of video frames.
## Input types
### Required
- **`clip_vision`**
    - Represents the CLIP vision model used for encoding visual features from the initial image, playing a crucial role in understanding the content and context of the image for video generation.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `torch.nn.Module`
- **`init_image`**
    - The initial image from which the video will be generated, serving as the starting point for the video generation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - A Variational Autoencoder (VAE) model used for encoding the initial image into a latent space, facilitating the generation of coherent and continuous video frames.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`width`**
    - The desired width of the video frames to be generated, allowing for customization of the video's resolution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The desired height of the video frames, enabling control over the video's aspect ratio and resolution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`video_frames`**
    - Specifies the number of frames to be generated for the video, determining the video's length.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`motion_bucket_id`**
    - An identifier for categorizing the type of motion to be applied in the video generation, aiding in the creation of dynamic and engaging videos.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fps`**
    - The frames per second (fps) rate for the video, influencing the smoothness and realism of the generated video.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`augmentation_level`**
    - A parameter controlling the level of augmentation applied to the initial image, affecting the diversity and variability of the generated video frames.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The positive conditioning data, consisting of encoded features and parameters for guiding the video generation process in a desired direction.
    - Python dtype: `List[Tuple[torch.Tensor, Dict]]`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The negative conditioning data, providing a contrast to the positive conditioning, which can be used to avoid certain patterns or features in the generated video.
    - Python dtype: `List[Tuple[torch.Tensor, Dict]]`
- **`latent`**
    - Comfy dtype: `LATENT`
    - Latent representations generated for each frame of the video, serving as a foundational component for the video generation process.
    - Python dtype: `Dict`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [Prompts Everywhere](../../cg-use-everywhere/Nodes/Prompts Everywhere.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - [SeargeSDXLSamplerV3](../../SeargeSDXL/Nodes/SeargeSDXLSamplerV3.md)



## Source code
```python
class SVD_img2vid_Conditioning:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "clip_vision": ("CLIP_VISION",),
                              "init_image": ("IMAGE",),
                              "vae": ("VAE",),
                              "width": ("INT", {"default": 1024, "min": 16, "max": nodes.MAX_RESOLUTION, "step": 8}),
                              "height": ("INT", {"default": 576, "min": 16, "max": nodes.MAX_RESOLUTION, "step": 8}),
                              "video_frames": ("INT", {"default": 14, "min": 1, "max": 4096}),
                              "motion_bucket_id": ("INT", {"default": 127, "min": 1, "max": 1023}),
                              "fps": ("INT", {"default": 6, "min": 1, "max": 1024}),
                              "augmentation_level": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 10.0, "step": 0.01})
                             }}
    RETURN_TYPES = ("CONDITIONING", "CONDITIONING", "LATENT")
    RETURN_NAMES = ("positive", "negative", "latent")

    FUNCTION = "encode"

    CATEGORY = "conditioning/video_models"

    def encode(self, clip_vision, init_image, vae, width, height, video_frames, motion_bucket_id, fps, augmentation_level):
        output = clip_vision.encode_image(init_image)
        pooled = output.image_embeds.unsqueeze(0)
        pixels = comfy.utils.common_upscale(init_image.movedim(-1,1), width, height, "bilinear", "center").movedim(1,-1)
        encode_pixels = pixels[:,:,:,:3]
        if augmentation_level > 0:
            encode_pixels += torch.randn_like(pixels) * augmentation_level
        t = vae.encode(encode_pixels)
        positive = [[pooled, {"motion_bucket_id": motion_bucket_id, "fps": fps, "augmentation_level": augmentation_level, "concat_latent_image": t}]]
        negative = [[torch.zeros_like(pooled), {"motion_bucket_id": motion_bucket_id, "fps": fps, "augmentation_level": augmentation_level, "concat_latent_image": torch.zeros_like(t)}]]
        latent = torch.zeros([video_frames, 4, height // 8, width // 8])
        return (positive, negative, {"samples":latent})

```
