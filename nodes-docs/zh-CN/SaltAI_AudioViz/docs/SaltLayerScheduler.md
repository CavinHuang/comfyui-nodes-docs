
# Documentation
- Class name: SaltLayerScheduler
- Category: SALT/Scheduling/Parallax Motion
- Output node: False

SaltLayerScheduler节点用于在视听演示中调度视差运动效果，实现动态相机移动，从而增强视觉体验的深度感和沉浸感。

# Input types
## Required
- frame_count
    - 指定动画的总帧数，设置视差运动效果的持续时间。
    - Comfy dtype: INT
    - Python dtype: int
- zoom_speed
    - 控制放大或缩小的速度，影响视差效果的感知深度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pan_speed
    - 决定平移的速度，影响视差运动中的横向移动。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pan_directions
    - 定义平移的方向，允许多样化的横向移动模式。
    - Comfy dtype: STRING
    - Python dtype: str
- direction_change_frames
    - 指示平移方向改变的帧，为运动增添动态性。
    - Comfy dtype: STRING
    - Python dtype: str
- tremor_scale
    - 设置"颤抖"效果的比例，为视差运动增加细微的抖动以增强真实感。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tremor_octaves
    - 确定颤抖效果的八度数，影响其复杂度和纹理。
    - Comfy dtype: INT
    - Python dtype: int
- tremor_persistence
    - 控制颤抖效果的持续性，影响其随时间的幅度变化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tremor_lacunarity
    - 调整颤抖效果的空隙度，影响颤抖变化的频率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- direction_curve
    - 指定方向变化的缓动函数，使平移方向之间的过渡更加平滑。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- start_x
    - 设置相机的起始X位置，决定其初始水平放置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_y
    - 设置相机的起始Y位置，决定其初始垂直放置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- zoom_mode
    - 选择缩放模式（放大、缩小或两者），定义整个动画过程中的缩放行为。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- layer_offsets
    - 定义不同层的偏移量，有助于在视差运动中创建分层深度效果。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- schedule_list
    - 表示调度的视差运动效果的列表，包括每一帧的缩放、平移和颤抖调整。
    - Comfy dtype: LIST
    - Python dtype: List[Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltLayerScheduler:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "frame_count": ("INT", {"default": 60, "min": 1, "max": 4096}),
                "zoom_speed": ("FLOAT", {"default": 0.01, "min": 0.001, "max": 1.0, "step": 0.001}),
                "pan_speed": ("FLOAT", {"default": 0.5, "min": 0.001, "max": 5.0, "step": 0.001}),
                "pan_directions": ("STRING", {"default": "90,180,270"}),
                "direction_change_frames": ("STRING", {"default": "10,20,40"}),
                "tremor_scale": ("FLOAT", {"default": 64, "min": 0.01, "max": 1024.0, "step": 0.01}),
                "tremor_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "tremor_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0, "step": 0.01}),
                "tremor_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 3.0, "step": 0.01}),
                "direction_curve": (list(easing_functions.keys()), ),
                "start_x": ("FLOAT", {"default": 0, "min": -nodes.MAX_RESOLUTION, "max": nodes.MAX_RESOLUTION}),
                "start_y": ("FLOAT", {"default": 0}),
                "zoom_mode": (["zoom-in", "zoom-out", "zoom-in-out"], ),
                "layer_offsets": ("STRING", {"default": "1,0.8,0.6"}),
            }
        }

    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("schedule_list",)
    FUNCTION = "execute"
    CATEGORY = "SALT/Scheduling/Parallax Motion"

    def __init__(self):
        self.scheduler = None

    def execute(self, **kwargs):

        self.process_kwargs(**kwargs)

        if not self.scheduler:
            raise Exception("Camera Scheduler was not initialized. Perhaps your settings are bugged?")
        
        mode = kwargs.get("zoom_mode", "zoom-in")
        layer_offsets = kwargs.get("layer_offsets", "1")

        animation_data = self.scheduler.animate(mode, layer_offsets)

        return (animation_data, )

    def process_kwargs(self, **kwargs):
        frame_count = kwargs.get("frame_count", 60)
        zoom_speed = kwargs.get("zoom_speed", 0.01)
        pan_speed = kwargs.get("pan_speed", 0.5)
        pan_directions = list(map(float, kwargs.get("pan_directions", "90,180,270").split(",")))
        direction_change_frames = list(map(int, kwargs.get("direction_change_frames", "10,20,40").split(",")))
        tremor_params = {
            "scale": kwargs.get("tremor_scale", 0.1),
            "octaves": kwargs.get("tremor_octaves", 1),
            "persistence": kwargs.get("tremor_persistence", 0.5),
            "lacunarity": kwargs.get("tremor_lacunarity", 2.0),
        }
        direction_curve = kwargs.get("direction_curve", "linear")
        start_x = kwargs.get("start_x", 0)
        start_y = kwargs.get("start_y", 0)

        self.scheduler = OrganicPerlinCameraScheduler(
            frame_count=frame_count,
            zoom_speed=zoom_speed,
            pan_speed=pan_speed,
            pan_directions=pan_directions,
            direction_change_frames=direction_change_frames,
            tremor_params=tremor_params,
            direction_curve=direction_curve,
            start_x=start_x,
            start_y=start_y,
        )

```
