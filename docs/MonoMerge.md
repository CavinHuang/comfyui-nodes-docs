
# Documentation
- Class name: MonoMerge
- Category: Bmad/image
- Output node: False

MonoMerge节点用于将两张图片合并成一张单色图片，基于目标色彩方案（偏向白色或黑色）。这个过程涉及比较两张图片对应像素的亮度，选择与目标色彩方案一致的像素，从而创建一张新图片，突出合并图片的亮部或暗部特征。

# Input types
## Required
- image1
    - 要合并的第一张图片。在合并过程中起关键作用，其像素会与第二张图片的像素进行比较，根据目标色彩方案确定最终图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image2
    - 要合并的第二张图片。与第一张图片同等重要，其像素会与第一张图片的像素进行比较，根据目标色彩方案创建最终的单色图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- target
    - 指定合并的目标色彩方案，可以是'white'或'black'。这决定了合并过程是强调图片的亮部还是暗部。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- output_format
    - 定义合并后图片的输出格式，为结果的使用或显示提供灵活性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输出是一张单色图片，根据指定的目标色彩方案合并了输入图片的元素，强调亮色调或暗色调。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MonoMerge:
    target = ["white", "black"]

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image1": ("IMAGE",),
                "image2": ("IMAGE",),
                "target": (s.target, {"default": "white"}),
                "output_format": (image_output_formats_options, {
                    "default": image_output_formats_options[0]
                })
                ,
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "monochromatic_merge"
    CATEGORY = "Bmad/image"

    def monochromatic_merge(self, image1, image2, target, output_format):
        image1 = tensor2opencv(image1, 1)
        image2 = tensor2opencv(image2, 1)

        # Select the lesser L component at each pixel
        if target == "white":
            image = np.maximum(image1, image2)
        else:
            image = np.minimum(image1, image2)

        image = maybe_convert_img(image, 1, image_output_formats_options_map[output_format])
        image = opencv2tensor(image)

        return (image,)

```
