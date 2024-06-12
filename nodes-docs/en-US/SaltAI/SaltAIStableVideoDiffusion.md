---
tags:
- Image
---

# Stable Video Diffusion
## Documentation
- Class name: `SaltAIStableVideoDiffusion`
- Category: `SALT/API/Stability API`
- Output node: `False`

The SaltAIStableVideoDiffusion node is designed to interface with Stability AI's API to generate video content based on a given image. It utilizes advanced diffusion techniques to produce high-quality video animations, transforming static images into dynamic video sequences through a series of API calls and image processing steps.
## Input types
### Required
- **`image`**
    - The input image to be transformed into a video sequence. It plays a crucial role in determining the visual content of the generated video.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`api_key`**
    - The API key required to authenticate requests to the Stability AI API. It is essential for accessing the video generation capabilities of the API.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`seed`**
    - A seed value to ensure reproducibility of the video generation process. It influences the randomness of the video's visual evolution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - The CFG scale parameter controls the creativity of the video generation. A higher value encourages more novel video content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mbi`**
    - The motion bucket ID parameter influences the motion dynamics within the generated video, affecting how the image animates over time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`frames`**
    - Comfy dtype: `IMAGE`
    - A batch of video frames as a tensor, representing the generated video sequence. Each frame is a transformation of the input image, collectively forming a coherent video.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltAIStableVideoDiffusion:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "api_key": ("STRING", {"multiline": False}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "cfg": ("FLOAT", {"default": 2.5, "min": 0.0, "max": 100.0, "step":0.1, "round": 0.01}),
                "mbi": ("INT", {"min": 1, "max": 255, "default": 40, "step": 1}),
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("frames",)

    FUNCTION = "generate_video"
    CATEGORY = "SALT/API/Stability API"

    def generate_video(self, image, api_key, seed=0, cfg=2.5, mbi=40):

        if api_key.strip() == "":
            raise Exception("A Stability AI API Key is required for video generaiton.")

        try:
            api = SAIAPI(api_key)

            if image.dim() != 4 and image.size(0) != 1:
                raise Exception("Only one image is allowed for Stability AI Stable Video Generation API.")
            
            image = tensor2pil(image)
            if image.size not in [(1024, 576), (576, 1024), (768, 768)]:
                raise Exception("Image resolution can only be within the following sizes: 1024x576, 576x1024, 768x768")
            
            frames = api.svd_img2vid(image=image, seed=seed, cfg=cfg, mbi=mbi)
            if frames and len(frames) > 0:
                frame_tensors = [pil2tensor(frame) for frame in frames]
                frame_batch = torch.cat(frame_tensors, dim=0)
            else:
                raise Exception("No frames found from SVD video temp file.")
        except Exception as e:
            raise e
        
        return (frame_batch, )

```
