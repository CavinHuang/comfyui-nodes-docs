
# Documentation
- Class name: `Color Clip ADE20k`
- Category: `Bmad/image`
- Output node: `False`

Color Clip ADE20k节点专门用于基于ADE20K数据集调整图像颜色，允许进行特定类别的颜色裁剪。它可以修改图像的颜色以匹配与ADE20K类名相关联的预定义颜色，从而增强图像的美观性或可视化分析的实用性。

# Input types
## Required
- image
    - 需要进行颜色裁剪的图像。它作为颜色修改的基础，裁剪操作将应用于此图像。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- target
    - 定义颜色裁剪的目标操作，例如转换为黑色、白色或保持原始颜色。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- complement
    - 指定与目标操作互补的操作，为颜色裁剪过程提供额外的控制。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- class_name
    - 指定ADE20K类名，其关联颜色将用于裁剪。这决定了裁剪操作的目标颜色，使图像的美学与该类的典型颜色保持一致。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 颜色裁剪操作后的结果图像，展示了应用的颜色调整。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ColorClipADE20K(ColorClip):
    @classmethod
    def INPUT_TYPES(s):
        types = super().get_types(advanced=False)
        types["required"].pop("color")
        types["required"]["class_name"] = (ade20k_class_names, {"default": 'animal, animate being, beast, brute, creature, fauna'})
        return types

    def color_clip(self, image, class_name, target, complement):
        clip_color = list((ADE20K_dic[class_name]*255).astype(np.uint8))
        image = self.clip(image, clip_color, target, complement)
        return (image,)

```
