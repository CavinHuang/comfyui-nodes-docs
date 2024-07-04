
# Documentation
- Class name: SaltScheduledShapeTransformation
- Category: SALT/Scheduling/Image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltScheduledShapeTransformation 节点旨在对图像执行预定的形状变换。它能够根据预先定义的各种参数（如大小、位置和旋转）的调度，在一系列帧上动态调整图像形状。这种功能可以用于创建复杂的动画效果或进行逐帧的图像处理。

# Input types
## Required
- max_frames
    - 指定形状变换序列的最大帧数。这决定了整个变换过程的持续时间。
    - Comfy dtype: INT
    - Python dtype: int
- image_width
    - 输出图像的宽度。这定义了最终生成图像的水平分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- image_height
    - 输出图像的高度。这定义了最终生成图像的垂直分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- initial_width
    - 变换开始前形状的初始宽度。这是形状变换的起始点。
    - Comfy dtype: INT
    - Python dtype: int
- initial_height
    - 变换开始前形状的初始高度。这是形状变换的起始点。
    - Comfy dtype: INT
    - Python dtype: int
- initial_x_coord
    - 形状初始位置的 x 坐标。这决定了形状在画面中的初始水平位置。
    - Comfy dtype: INT
    - Python dtype: int
- initial_y_coord
    - 形状初始位置的 y 坐标。这决定了形状在画面中的初始垂直位置。
    - Comfy dtype: INT
    - Python dtype: int
- initial_rotation
    - 形状的初始旋转角度，以度为单位。这设定了形状的初始朝向。
    - Comfy dtype: FLOAT
    - Python dtype: float
- shape_mode
    - 定义要变换的形状的模式或类型，允许各种几何形状。这决定了变换过程中使用的基本形状。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- shape
    - 可选。要变换的特定形状（如适用）。这允许使用自定义形状进行变换。
    - Comfy dtype: MASK
    - Python dtype: str
- width_schedule
    - 定义随时间变化的宽度变换的调度列表。这控制了形状宽度如何随时间变化。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- height_schedule
    - 定义随时间变化的高度变换的调度列表。这控制了形状高度如何随时间变化。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- x_schedule
    - 定义随时间变化的 x 坐标变换的调度列表。这控制了形状水平位置如何随时间变化。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- y_schedule
    - 定义随时间变化的 y 坐标变换的调度列表。这控制了形状垂直位置如何随时间变化。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- rotation_schedule
    - 定义随时间变化的旋转角度变换的调度列表。这控制了形状旋转如何随时间变化。
    - Comfy dtype: LIST
    - Python dtype: List[float]

# Output types
- images
    - 预定形状变换的结果图像。这是一系列经过变换处理的图像帧。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduledShapeTransformation:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "max_frames": ("INT", {"min": 1}),
                "image_width": ("INT", {"default": 512, "min": -MAX_RESOLUTION, "max": MAX_RESOLUTION}),
                "image_height": ("INT", {"default": 512, "min": -MAX_RESOLUTION, "max": MAX_RESOLUTION}),
                "initial_width": ("INT", {"default": 256, "min": -MAX_RESOLUTION, "max": MAX_RESOLUTION}),
                "initial_height": ("INT", {"default": 256, "min": -MAX_RESOLUTION, "max": MAX_RESOLUTION}),
                "initial_x_coord": ("INT", {"default": 256, "min": -MAX_RESOLUTION, "max": MAX_RESOLUTION}),
                "initial_y_coord": ("INT", {"default": 256, "min": -MAX_RESOLUTION, "max": MAX_RESOLUTION}),
                "initial_rotation": ("FLOAT", {"min": 0, "max": 360, "step": 0.01}),
                "shape_mode": (["circle", "diamond", "triangle", "square", "hexagon", "octagon"], ),
            },
            "optional": {
                "shape": ("MASK", ),
                "width_schedule": ("LIST", ),
                "height_schedule": ("LIST", ),
                "x_schedule": ("LIST", ),
                "y_schedule": ("LIST", ),
                "rotation_schedule": ("LIST", ),
            }
        }

    RETURN_TYPES = ("IMAGE", )
    RETURN_NAMES = ("images", )
    FUNCTION = "transform_shape"
    CATEGORY = "SALT/Scheduling/Image"

    def apply_multiply_operation(self, initial_value, schedule, frame_idx):
        factor = schedule[min(frame_idx, len(schedule) - 1)]
        return initial_value * factor

    def draw_shape(self, draw, shape_mode, center, width, height):
        if shape_mode == "circle":
            draw.ellipse([(center[0] - width / 2, center[1] - height / 2), (center[0] + width / 2, center[1] + height / 2)], fill="white")
        elif shape_mode == "square":
            draw.rectangle([(center[0] - width / 2, center[1] - height / 2), (center[0] + width / 2, center[1] + height / 2)], fill="white")
        elif shape_mode == "diamond":
            half_width = width / 2
            half_height = height / 2
            draw.polygon([center[0], center[1] - half_height, center[0] + half_width, center[1], center[0], center[1] + half_height, center[0] - half_width, center[1]], fill="white")
        elif shape_mode == "triangle":
            draw.polygon([(center[0], center[1] - height / 2), (center[0] + width / 2, center[1] + height / 2), (center[0] - width / 2, center[1] + height / 2)], fill="white")
        elif shape_mode == "hexagon":
            angle = 2 * np.pi / 6
            points = [(center[0] + math.cos(i * angle) * width / 2, center[1] + math.sin(i * angle) * height / 2) for i in range(6)]
            draw.polygon(points, fill="white")
        elif shape_mode == "octagon":
            angle = 2 * np.pi / 8
            points = [(center[0] + math.cos(i * angle) * width / 2, center[1] + math.sin(i * angle) * height / 2) for i in range(8)]
            draw.polygon(points, fill="white")

    def transform_shape(self, max_frames, image_width, image_height, initial_width, initial_height, initial_x_coord, initial_y_coord, initial_rotation, shape_mode, shape=None, width_schedule=[1.0], height_schedule=[1.0], x_schedule=[1.0], y_schedule=[1.0], rotation_schedule=[1.0]):
        frames = []
        for frame_idx in range(max_frames):
            width = self.apply_multiply_operation(initial_width, width_schedule, frame_idx)
            height = self.apply_multiply_operation(initial_height, height_schedule, frame_idx)
            x_coord = self.apply_multiply_operation(initial_x_coord, x_schedule, frame_idx)
            y_coord = self.apply_multiply_operation(initial_y_coord, y_schedule, frame_idx)
            rotation_fraction = rotation_schedule[min(frame_idx, len(rotation_schedule) - 1)]
            rotation_degree = rotation_fraction * 360
            
            img = Image.new('RGB', (image_width, image_height), 'black')
            if isinstance(shape, torch.Tensor):
                shape_image = mask2pil(shape)
                shape_image = shape_image.resize((max(int(width), 1), max(int(height), 1)), resample=Image.LANCZOS)
                rotated_shape_image = shape_image.rotate(rotation_degree, expand=True, fillcolor=(0), resample=Image.BILINEAR)
                paste_x = int(x_coord - rotated_shape_image.width / 2)
                paste_y = int(y_coord - rotated_shape_image.height / 2)
                img.paste(rotated_shape_image, (paste_x, paste_y), rotated_shape_image)
            else:
                shape_img = Image.new('RGBA', (max(int(width), 1), max(int(height), 1)), (0, 0, 0, 0))
                shape_draw = ImageDraw.Draw(shape_img)
                self.draw_shape(shape_draw, shape_mode, (shape_img.width / 2, shape_img.height / 2), width, height)
                rotated_shape_img = shape_img.rotate(rotation_degree, expand=True, fillcolor=(0), resample=Image.BILINEAR)
                paste_x = int(x_coord - rotated_shape_img.width / 2)
                paste_y = int(y_coord - rotated_shape_img.height / 2)
                img.paste(rotated_shape_img, (paste_x, paste_y), rotated_shape_img)

            frames.append(img)
            
        if frames:
            tensor = [pil2tensor(img) for img in frames]
            tensor = torch.cat(tensor, dim=0)
        else:
            raise ValueError("No frames were generated!")

        return (tensor, )

```
