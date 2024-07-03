
# Documentation
- Class name: FL_Ascii
- Category: 🏵️Fill Nodes
- Output node: False

FL_Ascii节点将图像转换为ASCII艺术。它通过根据指定的间距调整输入图像的大小，然后将像素亮度值映射到字符来实现这一效果。这种艺术效果利用选定的字体和字符集重新创建原始图像，呈现出独特的基于文本的美学效果。

# Input types
## Required
- image
    - 需要转换为ASCII艺术的输入图像。它作为ASCII转换过程的画布。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- spacing
    - 决定ASCII艺术中字符之间的间距，影响输出的分辨率和细节。
    - Comfy dtype: INT
    - Python dtype: int
- font_size
    - 指定生成ASCII艺术时使用的字体大小，影响文本的清晰度和可读性。
    - Comfy dtype: INT
    - Python dtype: int
- font_name
    - 用于渲染ASCII艺术中字符的字体名称，影响输出的风格和外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- characters
    - 用于创建ASCII艺术的字符串，每个字符的放置基于像素亮度。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 生成的ASCII艺术图像，展示了用字符重新诠释的原始图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FL_Ascii:
    def __init__(self):
        pass


    @classmethod
    def INPUT_TYPES(s):
        font_list = [x.split('/')[-1] for x in matplotlib.font_manager.findSystemFonts(fontpaths=None, fontext="ttf" )]
        return {
            "required": {
                "image": ("IMAGE",),
                "spacing": (
                    "INT",
                    {
                        "default": 20,
                        "min": 4,
                        "max": 100,
                        "step": 2,
                    },
                ),
                "font_size": (
                    "INT",
                    {
                        "default": 20,
                        "min": 4,
                        "max": 100,
                        "step": 2,
                    },
                ),
                "font_name": (font_list,),
                "characters": (
                    "STRING",
                    {
                        "default": "",
                        "description": "characters to use",
                    },
                ),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply_ascii_art_effect"
    CATEGORY = "🏵️Fill Nodes"

    def apply_ascii_art_effect(
        self,
        image: torch.Tensor,
        spacing: int,
        font_size: int,
        font_name: str,
        characters,
    ):
        batch_size, height, width, channels = image.shape
        result = torch.zeros_like(image)

        for b in range(batch_size):
            img_b = image[b] * 255.0
            img_b = Image.fromarray(img_b.numpy().astype("uint8"), "RGB")
            result_b = ascii_art_effect(
                img_b, spacing, font_size, font_name, characters
            )
            result_b = torch.tensor(np.array(result_b)) / 255.0
            result[b] = result_b

            # Update the print log
            progress = (b + 1) / batch_size * 100
            sys.stdout.write(f"\rProcessing images: {progress:.2f}%")
            sys.stdout.flush()

        # Print a new line after the progress log
        print()

        return (result,)

```
