
# Documentation
- Class name: SaltAIStableVideoDiffusion
- Category: SALT/API/Stability API
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltAIStableVideoDiffusion 节点旨在与 Stability AI 的 API 进行交互，以根据给定的图像生成视频内容。该节点采用先进的扩散技术，通过一系列的 API 调用和图像处理步骤，将静态图像转化为高质量的视频动画序列，从而产生动态的视频内容。

# Input types
## Required
- image
    - 用于转换成视频序列的输入图像。它在决定生成视频的视觉内容方面起着至关重要的作用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- api_key
    - 用于验证对 Stability AI API 请求的 API 密钥。它对于访问 API 的视频生成功能至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - 用于确保视频生成过程可重复性的种子值。它影响视频视觉演变的随机性。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - CFG 比例参数控制视频生成的创造性。较高的值会鼓励产生更新颖的视频内容。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mbi
    - 运动桶 ID 参数影响生成视频中的运动动态，影响图像随时间的动画方式。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- frames
    - 作为张量的一批视频帧，代表生成的视频序列。每一帧都是输入图像的一种转换，共同形成一个连贯的视频。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
