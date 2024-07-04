
# Documentation
- Class name: EnhanceDetail
- Category: image/filters
- Output node: False

EnhanceDetail节点旨在通过应用一系列滤镜来提高图像的视觉质量，这些滤镜可以增强细节、调整锐度，并可能降低噪声。该节点通过相对于引导滤波器输出来操作图像的细节，从而对增强过程实现精细控制。

# Input types
## Required
- images
    - 需要增强的输入图像。这个参数至关重要，因为它直接影响增强过程，作为所有后续操作的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- filter_radius
    - 指定增强过程中应用的滤镜半径。较大的半径可能会导致更明显的细节增强，但也可能增加处理时间。
    - Comfy dtype: INT
    - Python dtype: int
- sigma
    - 控制引导滤波器的sigma参数，影响平滑程度和细节保留。
    - Comfy dtype: FLOAT
    - Python dtype: float
- denoise
    - 决定降噪滤镜的强度。较高的值可以减少噪声，但也可能减弱细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- detail_mult
    - 细节增强的乘数。调整这个值可以微调细节增强效果的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 节点的输出，即经过增强处理后的图像。这些图像预期会有更好的细节表现，并可能降低了噪声。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class EnhanceDetail:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "filter_radius": ("INT", {
                    "default": 2,
                    "min": 1,
                    "max": 64,
                    "step": 1
                }),
                "sigma": ("FLOAT", {
                    "default": 0.1,
                    "min": 0.01,
                    "max": 100.0,
                    "step": 0.01
                }),
                "denoise": ("FLOAT", {
                    "default": 0.1,
                    "min": 0.0,
                    "max": 10.0,
                    "step": 0.01
                }),
                "detail_mult": ("FLOAT", {
                    "default": 2.0,
                    "min": 0.0,
                    "max": 100.0,
                    "step": 0.1
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "enhance"

    CATEGORY = "image/filters"

    def enhance(self, images: torch.Tensor, filter_radius: int, sigma: float, denoise: float, detail_mult: float):
        
        if filter_radius == 0:
            return (images,)
        
        d = filter_radius * 2 + 1
        s = sigma / 10
        n = denoise / 10
        
        dup = copy.deepcopy(images.cpu().numpy())
        
        for index, image in enumerate(dup):
            imgB = image
            if denoise>0.0:
                imgB = cv2.bilateralFilter(image, d, n, d)
            
            imgG = np.clip(guidedFilter(image, image, d, s), 0.001, 1)
            
            details = (imgB/imgG - 1) * detail_mult + 1
            dup[index] = np.clip(details*imgG - imgB + image, 0, 1)
        
        return (torch.from_numpy(dup),)

```
