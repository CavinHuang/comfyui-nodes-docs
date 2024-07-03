
# Documentation
- Class name: AlphaMatte
- Category: image/filters
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AlphaMatte节点是一个专门用于图像处理的高级工具，主要功能是提取和优化图像的alpha遮罩（透明度通道）。它利用深度学习技术，通过分析图像及其alpha trimap（三值图），能够准确地将前景与背景分离，即使在复杂场景中也能表现出色。该节点具备预模糊处理、调整黑白点以及进行迭代优化的能力，以实现高质量的遮罩提取。

# Input types
## Required
- images
    - 需要提取alpha遮罩的输入图像。这个参数至关重要，因为它直接影响遮罩提取过程的质量和准确性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- alpha_trimap
    - 一个三值图，为前景、背景和未知区域提供初步猜测，指导遮罩提取过程。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- preblur
    - 指定应用于trimap的预模糊量，用于平滑硬边缘并改善遮罩提取效果。
    - Comfy dtype: INT
    - Python dtype: int
- blackpoint
    - 用于调整trimap对比度的黑点值，有助于更清晰地分离前景和背景。
    - Comfy dtype: FLOAT
    - Python dtype: float
- whitepoint
    - 用于调整trimap亮度的白点值，增强前景和背景区域之间的区分度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_iterations
    - 允许优化alpha遮罩的最大迭代次数，确保质量和计算效率之间的平衡。
    - Comfy dtype: INT
    - Python dtype: int
- estimate_fg
    - 一个标志，指示是否除alpha遮罩外还要估算前景，提供更完整的图像元素分离。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- alpha
    - 提取出的alpha遮罩，表示图像中前景元素的透明度级别。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- fg
    - 当estimate_fg标志为真时获得的估算图像前景。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- bg
    - 估算的图像背景，适用于合成或进一步处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AlphaMatte:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "alpha_trimap": ("IMAGE",),
                "preblur": ("INT", {
                    "default": 8,
                    "min": 0,
                    "max": 256,
                    "step": 1
                }),
                "blackpoint": ("FLOAT", {
                    "default": 0.01,
                    "min": 0.0,
                    "max": 0.99,
                    "step": 0.01
                }),
                "whitepoint": ("FLOAT", {
                    "default": 0.99,
                    "min": 0.01,
                    "max": 1.0,
                    "step": 0.01
                }),
                "max_iterations": ("INT", {
                    "default": 1000,
                    "min": 100,
                    "max": 10000,
                    "step": 100
                }),
                "estimate_fg": (["true", "false"],),
            },
        }

    RETURN_TYPES = ("IMAGE", "IMAGE", "IMAGE",)
    RETURN_NAMES = ("alpha", "fg", "bg",)
    FUNCTION = "alpha_matte"

    CATEGORY = "image/filters"

    def alpha_matte(self, images, alpha_trimap, preblur, blackpoint, whitepoint, max_iterations, estimate_fg):
        
        d = preblur * 2 + 1
        
        i_dup = copy.deepcopy(images.cpu().numpy().astype(np.float64))
        a_dup = copy.deepcopy(alpha_trimap.cpu().numpy().astype(np.float64))
        fg = copy.deepcopy(images.cpu().numpy().astype(np.float64))
        bg = copy.deepcopy(images.cpu().numpy().astype(np.float64))
        
        
        for index, image in enumerate(i_dup):
            trimap = a_dup[index][:,:,0] # convert to single channel
            if preblur > 0:
                trimap = cv2.GaussianBlur(trimap, (d, d), 0)
            trimap = fix_trimap(trimap, blackpoint, whitepoint)
            
            alpha = estimate_alpha_cf(image, trimap, laplacian_kwargs={"epsilon": 1e-6}, cg_kwargs={"maxiter":max_iterations})
            
            if estimate_fg == "true":
                fg[index], bg[index] = estimate_foreground_ml(image, alpha, return_background=True)
            
            a_dup[index] = np.stack([alpha, alpha, alpha], axis = -1) # convert back to rgb
        
        return (
            torch.from_numpy(a_dup.astype(np.float32)), # alpha
            torch.from_numpy(fg.astype(np.float32)), # fg
            torch.from_numpy(bg.astype(np.float32)), # bg
            )

```
