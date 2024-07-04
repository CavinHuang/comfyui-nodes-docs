
# Documentation
- Class name: ColorMatchImage
- Category: image/filters
- Output node: False

ColorMatchImage节点旨在调整图像的颜色，使其与目标色彩方案或另一张图像相匹配或协调。这一过程在图像编辑和合成工作流程中至关重要，特别是在需要确保不同元素之间颜色一致性的场景下。

# Input types
## Required
- images
    - 'images'输入代表需要进行颜色调整的源图像。它是定义颜色匹配过程起点的关键。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- reference
    - 'reference'输入指定了源图像应该匹配的目标图像或色彩方案。它对于引导颜色匹配过程朝向预期结果至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- blur
    - 'blur'输入控制应用于参考图像的模糊程度，影响颜色匹配的柔和度。
    - Comfy dtype: INT
    - Python dtype: float
- factor
    - 'factor'输入决定了颜色匹配效果的强度，允许对最终外观进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 'image'输出提供了颜色调整后的结果图像，展示了颜色匹配过程的效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ColorMatchImage:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE", ),
                "reference": ("IMAGE", ),
                "blur": ("INT", {"default": 0, "min": 0, "max": 1023}),
                "factor": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01,  "round": 0.01}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "batch_normalize"

    CATEGORY = "image/filters"

    def batch_normalize(self, images, reference, blur, factor):
        t = images.detach().clone()
        ref = reference.detach().clone()
        if ref.shape[0] < t.shape[0]:
            ref = ref[0].unsqueeze(0).repeat(t.shape[0], 1, 1, 1)
        
        if blur == 0:
            mean = torch.mean(t, (1,2), keepdim=True)
            mean_ref = torch.mean(ref, (1,2), keepdim=True)
            for i in range(t.shape[0]):
                for c in range(3):
                    t[i,:,:,c] /= mean[i,0,0,c]
                    t[i,:,:,c] *= mean_ref[i,0,0,c]
        else:
            d = blur * 2 + 1
            blurred = cv_blur_tensor(torch.clamp(t, 0.001, 1), d, d)
            blurred_ref = cv_blur_tensor(torch.clamp(ref, 0.001, 1), d, d)
            for i in range(t.shape[0]):
                for c in range(3):
                    t[i,:,:,c] /= blurred[i,:,:,c]
                    t[i,:,:,c] *= blurred_ref[i,:,:,c]
        
        t = torch.lerp(images, t, factor)
        return (t,)

```
