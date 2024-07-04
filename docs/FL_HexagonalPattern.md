
# Documentation
- Class name: FL_HexagonalPattern
- Category: 🏵️Fill Nodes
- Output node: False

FL_HexagonalPattern节点旨在将一组图像转换成六边形图案，根据图像尺寸调整六边形大小，并可选择性地应用阴影效果以增强视觉深度。它允许通过六边形大小、阴影属性和背景颜色等参数来自定义六边形图案，从而实现多样化的图像风格处理方法。

# Input types
## Required
- images
    - 需要转换成六边形图案的图像集合。这个参数是节点操作的核心输入，是生成六边形图案的主要依据。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
## Optional
- hexagon_size
    - 指定图案中六边形的期望大小，影响六边形铺砌的整体外观和精细程度。
    - Comfy dtype: INT
    - Python dtype: int
- shadow_offset
    - 确定应用于每个六边形的阴影效果的偏移距离，增强图案的视觉深度。
    - Comfy dtype: INT
    - Python dtype: int
- shadow_color
    - 定义阴影效果的颜色，允许自定义阴影的外观。
    - Comfy dtype: STRING
    - Python dtype: str
- background_color
    - 设置输出图像的背景颜色，为六边形图案提供基础。
    - Comfy dtype: STRING
    - Python dtype: str
- rotation
    - 控制图案中每个六边形的旋转角度，提供额外的风格定制维度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- spacing
    - 调整图案中个别六边形之间的间距，影响图案的密度和整体美感。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 应用了六边形图案的转换后图像，包含任何指定的阴影效果和背景颜色。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FL_HexagonalPattern:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
            },
            "optional": {
                "hexagon_size": ("INT", {"default": 100, "min": 50, "max": 500, "step": 10}),
                "shadow_offset": ("INT", {"default": 5, "min": 0, "max": 20, "step": 1}),
                "shadow_color": ("STRING", {"default": "purple"}),
                "background_color": ("STRING", {"default": "black"}),
                "rotation": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 360.0, "step": 1.0}),
                "spacing": ("FLOAT", {"default": 1.0, "min": 0.5, "max": 2.0, "step": 0.1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "hexagonal_pattern"
    CATEGORY = "🏵️Fill Nodes"

    def t2p(self, t):
        if t is not None:
            i = 255.0 * t.cpu().numpy().squeeze()
            p = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
        return p

    def create_hexagon_mask(self, size):
        mask = Image.new("L", (size, size), 0)
        draw = ImageDraw.Draw(mask)
        draw.regular_polygon((size // 2, size // 2, size // 2), 6, fill=255)
        return mask

    def calculate_adjusted_hexagon_size(self, width, height, hexagon_size, spacing):
        horizontal_count = math.ceil(width / (hexagon_size * spacing))
        vertical_count = math.ceil(height / (hexagon_size * spacing * math.sqrt(3) / 2))

        adjusted_width = width / horizontal_count
        adjusted_height = height / (vertical_count * math.sqrt(3) / 2)

        return min(adjusted_width, adjusted_height) / spacing

    def hexagonal_pattern(self, images, hexagon_size=100, shadow_offset=5, shadow_color="black", shadow_opacity=0.5,
                          background_color="white", rotation=0.0, spacing=1.0):
        out = []
        total_images = len(images)
        for i, img_tensor in enumerate(images, start=1):
            p = self.t2p(img_tensor)
            width, height = p.size

            adjusted_hexagon_size = self.calculate_adjusted_hexagon_size(width, height, hexagon_size, spacing)
            hexagon_mask = self.create_hexagon_mask(int(adjusted_hexagon_size))

            output_image = Image.new("RGBA", (width, height), background_color)

            for y in range(0, height, int(adjusted_hexagon_size * spacing * math.sqrt(3) / 2)):
                for x in range(0, width, int(adjusted_hexagon_size * spacing)):
                    if y % (2 * int(adjusted_hexagon_size * spacing * math.sqrt(3) / 2)) == int(adjusted_hexagon_size * spacing * math.sqrt(3) / 2):
                        x += int(adjusted_hexagon_size * spacing) // 2

                    cropped_hexagon = p.crop((x, y, x + int(adjusted_hexagon_size), y + int(adjusted_hexagon_size))).rotate(rotation, expand=True)

                    shadow = Image.new("RGBA", cropped_hexagon.size, (0, 0, 0, 0))
                    shadow_mask = hexagon_mask.copy().resize(cropped_hexagon.size)
                    shadow.paste(shadow_color, (shadow_offset, shadow_offset), shadow_mask)
                    shadow.putalpha(int(255 * shadow_opacity))

                    output_image.paste(shadow, (x + shadow_offset, y + shadow_offset), shadow_mask)
                    output_image.paste(cropped_hexagon, (x, y), shadow_mask)

            o = np.array(output_image.convert("RGB")).astype(np.float32) / 255.0
            o = torch.from_numpy(o).unsqueeze(0)
            out.append(o)

            # Print progress update
            progress = i / total_images * 100
            sys.stdout.write(f"\rProcessing images: {progress:.2f}%")
            sys.stdout.flush()

        # Print a new line after the progress update
        print()

        out = torch.cat(out, 0)
        return (out,)

```
