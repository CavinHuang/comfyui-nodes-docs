
# Documentation
- Class name: FL_Ripple
- Category: 🏵️Fill Nodes
- Output node: False

FL_Ripple节点用于对一组图像应用波纹效果，通过模拟波纹模式来变换每张图像。这种效果是通过基于指定参数（如振幅、频率和相位）对图像像素进行数学处理来实现的，从而创造出视觉上动态的结果。

# Input types
## Required
- images
    - 要应用波纹效果的图像集合。这个参数对于确定将要进行变换的输入图像至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
## Optional
- amplitude
    - 定义波纹波浪的高度。较高的振幅会产生更明显的波纹效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frequency
    - 决定图像中波纹的数量。较高的频率会在给定空间内产生更多的波纹。
    - Comfy dtype: FLOAT
    - Python dtype: float
- phase
    - 调整波纹效果的起始点，允许波形模式中的相位移动。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 输出是应用了波纹效果的图像，以张量形式表示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FL_Ripple:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
            },
            "optional": {
                "amplitude": ("FLOAT", {"default": 10.0, "min": 0.1, "max": 50.0, "step": 0.1}),
                "frequency": ("FLOAT", {"default": 20.0, "min": 1.0, "max": 100.0, "step": 0.1}),
                "phase": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 360.0, "step": 1.0}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "ripple"
    CATEGORY = "🏵️Fill Nodes"

    def t2p(self, t):
        if t is not None:
            i = 255.0 * t.cpu().numpy().squeeze()
            p = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
        return p

    def ripple(self, images, amplitude=10.0, frequency=20.0, phase=0.0):
        out = []
        total_images = len(images)
        for i, img in enumerate(images, start=1):
            p = self.t2p(img)
            width, height = p.size
            center_x = width // 2
            center_y = height // 2

            x, y = np.meshgrid(np.arange(width), np.arange(height))
            dx = x - center_x
            dy = y - center_y
            distance = np.sqrt(dx ** 2 + dy ** 2)

            angle = distance / frequency * 2 * np.pi + np.radians(phase)
            offset_x = (amplitude * np.sin(angle)).astype(int)
            offset_y = (amplitude * np.cos(angle)).astype(int)

            sample_x = np.clip(x + offset_x, 0, width - 1)
            sample_y = np.clip(y + offset_y, 0, height - 1)

            p_array = np.array(p)
            rippled_array = p_array[sample_y, sample_x]

            o = rippled_array.astype(np.float32) / 255.0
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
