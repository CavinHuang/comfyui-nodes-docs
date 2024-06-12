---
tags:
- Scheduling
- VisualEffects
---

# Parallax Motion Camera Scheduler
## Documentation
- Class name: `SaltLayerScheduler`
- Category: `SALT/Scheduling/Parallax Motion`
- Output node: `False`

The SaltLayerScheduler node is designed for scheduling parallax motion effects in audio-visual presentations, enabling dynamic camera movements that enhance the depth and immersion of the visual experience.
## Input types
### Required
- **`frame_count`**
    - Specifies the total number of frames for the animation, setting the duration of the parallax motion effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`zoom_speed`**
    - Controls the speed of zooming in or out, affecting the perceived depth of the parallax effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pan_speed`**
    - Determines the speed of panning, influencing the lateral movement in the parallax motion.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pan_directions`**
    - Defines the directions for panning, allowing for varied lateral movement patterns.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`direction_change_frames`**
    - Indicates the frames at which the direction of panning changes, adding dynamism to the motion.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`tremor_scale`**
    - Sets the scale of the 'tremor' effect, adding a subtle shake to the parallax motion for realism.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`tremor_octaves`**
    - Determines the number of octaves for the tremor effect, influencing its complexity and texture.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tremor_persistence`**
    - Controls the persistence of the tremor effect, affecting its amplitude over time.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`tremor_lacunarity`**
    - Adjusts the lacunarity of the tremor effect, impacting the frequency of the tremor's variations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`direction_curve`**
    - Specifies the easing function for direction changes, smoothing the transitions between panning directions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`start_x`**
    - Sets the starting X position for the camera, determining its initial horizontal placement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_y`**
    - Sets the starting Y position for the camera, determining its initial vertical placement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`zoom_mode`**
    - Chooses the mode of zooming (in, out, or both), defining the zoom behavior throughout the animation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`layer_offsets`**
    - Defines the offsets for different layers, contributing to the layered depth effect in the parallax motion.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`schedule_list`**
    - Comfy dtype: `LIST`
    - A list representing the scheduled parallax motion effects, including zoom, pan, and tremor adjustments for each frame.
    - Python dtype: `List[Any]`
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
