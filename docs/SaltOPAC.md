
# Documentation
- Class name: SaltOPAC
- Category: SALT/Scheduling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltOPAC节点旨在协调Perlin噪声的采样配置，用于音视频内容生成框架。它专门针对Perlin噪声设置的优化和应用，以增强与音频或其他触发器同步的动态视觉效果。

# Input types
## Required
- use_wiggle
    - 控制是否启用抖动效果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- frame_count
    - 指定要生成的帧数。
    - Comfy dtype: INT
    - Python dtype: int
- zoom_range
    - 设置缩放效果的范围。
    - Comfy dtype: STRING
    - Python dtype: str
- zoom_tremor_scale
    - 调整缩放抖动的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- angle_range
    - 定义角度变化的范围。
    - Comfy dtype: STRING
    - Python dtype: str
- angle_tremor_scale
    - 控制角度抖动的幅度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- trx_range
    - 设置X轴平移的范围。
    - Comfy dtype: STRING
    - Python dtype: str
- trx_tremor_scale
    - 调整X轴平移抖动的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- try_range
    - 设置Y轴平移的范围。
    - Comfy dtype: STRING
    - Python dtype: str
- try_tremor_scale
    - 调整Y轴平移抖动的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- trz_range
    - 设置Z轴平移的范围。
    - Comfy dtype: STRING
    - Python dtype: str
- trz_tremor_scale
    - 调整Z轴平移抖动的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rotx_range
    - 定义X轴旋转的范围。
    - Comfy dtype: STRING
    - Python dtype: str
- rotx_tremor_scale
    - 控制X轴旋转抖动的幅度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- roty_range
    - 定义Y轴旋转的范围。
    - Comfy dtype: STRING
    - Python dtype: str
- roty_tremor_scale
    - 控制Y轴旋转抖动的幅度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rotz_range
    - 定义Z轴旋转的范围。
    - Comfy dtype: STRING
    - Python dtype: str
- rotz_tremor_scale
    - 控制Z轴旋转抖动的幅度。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Optional
- opac_perlin_settings
    - 包含Perlin噪声设置的字典，用于自定义噪声生成。
    - Comfy dtype: DICT
    - Python dtype: dict

# Output types
- zoom_schdule_list
    - 生成的缩放效果调度列表。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- angle_schdule_list
    - 生成的角度变化调度列表。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- translation_x_schdule_list
    - X轴平移效果的调度列表。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- translation_y_schdule_list
    - Y轴平移效果的调度列表。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- translation_z_schdule_list
    - Z轴平移效果的调度列表。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- rotation_3d_x_schdule_list
    - X轴3D旋转效果的调度列表。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- rotation_3d_y_schdule_list
    - Y轴3D旋转效果的调度列表。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- rotation_3d_z_schdule_list
    - Z轴3D旋转效果的调度列表。
    - Comfy dtype: LIST
    - Python dtype: List[float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltOPAC:
    """
        Generates semi-random keyframes for zoom, spin, and translation based on specified start and end ranges,
        with individual tremor scale controls for each parameter, allowing for organic variation using Perlin noise.
    """
    def __init__(self):
        self.noise_base = random.randint(0, 1000)
        self.perlin_noise = PerlinNoise()

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "use_wiggle": ("BOOLEAN", {"default": True}),
                "frame_count": ("INT", {"default": 48, "min": 1, "max": 500}),
                "zoom_range": ("STRING", {"default": "0.95,1.05"}),
                "zoom_tremor_scale": ("FLOAT", {"default": 0.05, "min": 0.01, "max": 1.0}),
                "angle_range": ("STRING", {"default": "-5,5"}),
                "angle_tremor_scale": ("FLOAT", {"default": 0.05, "min": 0.01, "max": 1.0}),
                "trx_range": ("STRING", {"default": "-10,10"}),
                "trx_tremor_scale": ("FLOAT", {"default": 0.05, "min": 0.01, "max": 1.0}),
                "try_range": ("STRING", {"default": "-10,10"}),
                "try_tremor_scale": ("FLOAT", {"default": 0.05, "min": 0.01, "max": 1.0}),
                "trz_range": ("STRING", {"default": "-10,10"}),
                "trz_tremor_scale": ("FLOAT", {"default": 0.05, "min": 0.01, "max": 1.0}),
                "rotx_range": ("STRING", {"default": "-5,5"}),
                "rotx_tremor_scale": ("FLOAT", {"default": 0.05, "min": 0.01, "max": 1.0}),
                "roty_range": ("STRING", {"default": "-5,5"}),
                "roty_tremor_scale": ("FLOAT", {"default": 0.05, "min": 0.01, "max": 1.0}),
                "rotz_range": ("STRING", {"default": "-5,5"}),
                "rotz_tremor_scale": ("FLOAT", {"default": 0.05, "min": 0.01, "max": 1.0}),
            },
            "optional": {
                "opac_perlin_settings": ("DICT", {})
            }
        }

    RETURN_TYPES = ("LIST", "LIST", "LIST", "LIST", "LIST", "LIST", "LIST", "LIST")
    RETURN_NAMES = ("zoom_schdule_list", "angle_schdule_list", "translation_x_schdule_list", "translation_y_schdule_list", "translation_z_schdule_list", "rotation_3d_x_schdule_list", "rotation_3d_y_schdule_list", "rotation_3d_z_schdule_list")
    FUNCTION = "execute"
    CATEGORY = "SALT/Scheduling"

    def process_kwargs(self, **kwargs):
        self.use_wiggle = kwargs.get('use_wiggle', True)
        self.frame_count = kwargs.get('frame_count', 48)
        self.zoom_range = tuple(map(float, kwargs.get('zoom_range', "0.95,1.05").split(',')))
        self.zoom_tremor_scale = kwargs.get('zoom_tremor_scale', 0.05)
        self.angle_range = tuple(map(float, kwargs.get('angle_range', "-5,5").split(',')))
        self.angle_tremor_scale = kwargs.get('angle_tremor_scale', 0.05)
        self.trx_range = tuple(map(float, kwargs.get('trx_range', "-10,10").split(',')))
        self.trx_tremor_scale = kwargs.get('trx_tremor_scale', 0.05)
        self.try_range = tuple(map(float, kwargs.get('try_range', "-10,10").split(',')))
        self.try_tremor_scale = kwargs.get('try_tremor_scale', 0.05)
        self.trz_range = tuple(map(float, kwargs.get('trz_range', "-10,10").split(',')))
        self.trz_tremor_scale = kwargs.get('trz_tremor_scale', 0.05)
        self.rotx_range = tuple(map(float, kwargs.get('rotx_range', "-5,5").split(',')))
        self.rotx_tremor_scale = kwargs.get('rotx_tremor_scale', 0.05)
        self.roty_range = tuple(map(float, kwargs.get('roty_range', "-5,5").split(',')))
        self.roty_tremor_scale = kwargs.get('roty_tremor_scale', 0.05)
        self.rotz_range = tuple(map(float, kwargs.get('rotz_range', "-5,5").split(',')))
        self.rotz_tremor_scale = kwargs.get('rotz_tremor_scale', 0.05)

        # Zoom Perlin settings
        self.zoom_octaves = kwargs.get('zoom_octaves', 1)
        self.zoom_persistence = kwargs.get('zoom_persistence', 0.5)
        self.zoom_lacunarity = kwargs.get('zoom_lacunarity', 2.0)
        self.zoom_repeat = kwargs.get('zoom_repeat', 1024)
            
        # Angle Perlin settings
        self.angle_octaves = kwargs.get('angle_octaves', 1)
        self.angle_persistence = kwargs.get('angle_persistence', 0.5)
        self.angle_lacunarity = kwargs.get('angle_lacunarity', 2.0)
        self.angle_repeat = kwargs.get('angle_repeat', 1024)
            
        # Translation Perlin settings (trx, try, trz)
        self.trx_octaves = kwargs.get('trx_octaves', 1)
        self.trx_persistence = kwargs.get('trx_persistence', 0.5)
        self.trx_lacunarity = kwargs.get('trx_lacunarity', 2.0)
        self.trx_repeat = kwargs.get('trx_repeat', 1024)
            
        self.try_octaves = kwargs.get('try_octaves', 1)
        self.try_persistence = kwargs.get('try_persistence', 0.5)
        self.try_lacunarity = kwargs.get('try_lacunarity', 2.0)
        self.try_repeat = kwargs.get('try_repeat', 1024)
            
        self.trz_octaves = kwargs.get('trz_octaves', 1)
        self.trz_persistence = kwargs.get('trz_persistence', 0.5)
        self.trz_lacunarity = kwargs.get('trz_lacunarity', 2.0)
        self.trz_repeat = kwargs.get('trz_repeat', 1024)
            
        # Rotation Perlin settings (rotx, roty, rotz)
        self.rotx_octaves = kwargs.get('rotx_octaves', 1)
        self.rotx_persistence = kwargs.get('rotx_persistence', 0.5)
        self.rotx_lacunarity = kwargs.get('rotx_lacunarity', 2.0)
        self.rotx_repeat = kwargs.get('rotx_repeat', 1024)
        
        self.roty_octaves = kwargs.get('roty_octaves', 1)
        self.roty_persistence = kwargs.get('roty_persistence', 0.5)
        self.roty_lacunarity = kwargs.get('roty_lacunarity', 2.0)
        self.roty_repeat = kwargs.get('roty_repeat', 1024)
            
        self.rotz_octaves = kwargs.get('rotz_octaves', 1)
        self.rotz_persistence = kwargs.get('rotz_persistence', 0.5)
        self.rotz_lacunarity = kwargs.get('rotz_lacunarity', 2.0)
        self.rotz_repeat = kwargs.get('rotz_repeat', 1024)

    #def sample_perlin(self, base, scale, x, min_val, max_val, octaves=1, persistence=0.5, lacunarity=2.0, repeat=1024):
    #    noise_val = self.perlin_noise.sample(base + x * scale, scale=1.0, octaves=octaves, persistence=persistence, lacunarity=lacunarity)
    #    return noise_val * (max_val - min_val) + min_val


    def sample_perlin(self, frame_index, range_min, range_max, tremor_scale, octaves, persistence, lacunarity, repeat):
        # Prepare noise correctly with normalization
        t = frame_index / (self.frame_count - 1 if self.frame_count > 1 else 1)
        linear_value = (range_max - range_min) * t + range_min
        noise = self.perlin_noise.sample(self.noise_base + frame_index * 0.1, scale=1.0, octaves=octaves, persistence=persistence, lacunarity=lacunarity)
        noise_adjustment = 1 + noise * tremor_scale
        interpolated_value = linear_value * noise_adjustment
        return interpolated_value

    def execute(self, **kwargs):

        if kwargs.__contains__("opac_perlin_settings"):
            perlin_settings = kwargs.pop("opac_perlin_settings")
            kwargs.update(perlin_settings)
            print("\033[1m\033[94mOPAC Perlin Settings applied!:\033[0m")

        # Process the input values
        self.process_kwargs(**kwargs)

        if not self.use_wiggle:
            return ([0] * self.frame_count,) * 8

        # More dynamic implementation this time
        zoom, angle, translation_x, translation_y, translation_z, rotation_3d_x, rotation_3d_y, rotation_3d_z = (
            [self.sample_perlin(i, *param) for i in range(self.frame_count)]
            for param in [
                (self.zoom_range[0], self.zoom_range[1], self.zoom_tremor_scale, self.zoom_octaves, self.zoom_persistence, self.zoom_lacunarity, self.zoom_repeat),
                (self.angle_range[0], self.angle_range[1], self.angle_tremor_scale, self.angle_octaves, self.angle_persistence, self.angle_lacunarity, self.angle_repeat),
                (self.trx_range[0], self.trx_range[1], self.trx_tremor_scale, self.trx_octaves, self.trx_persistence, self.trx_lacunarity, self.trx_repeat),
                (self.try_range[0], self.try_range[1], self.try_tremor_scale, self.try_octaves, self.try_persistence, self.try_lacunarity, self.try_repeat),
                (self.trz_range[0], self.trz_range[1], self.trz_tremor_scale, self.trz_octaves, self.trz_persistence, self.trz_lacunarity, self.trz_repeat),
                (self.rotx_range[0], self.rotx_range[1], self.rotx_tremor_scale, self.rotx_octaves, self.rotx_persistence, self.rotx_lacunarity, self.rotx_repeat),
                (self.roty_range[0], self.roty_range[1], self.roty_tremor_scale, self.roty_octaves, self.roty_persistence, self.roty_lacunarity, self.roty_repeat),
                (self.rotz_range[0], self.rotz_range[1], self.rotz_tremor_scale, self.rotz_octaves, self.rotz_persistence, self.rotz_lacunarity, self.rotz_repeat)
            ]
        )
            
        print("\033[1m\033[94mOPAC Schedule Curves:\033[0m")

        log_curve("zoom", zoom)
        log_curve("angle", angle)
        log_curve("translation_x", translation_x)
        log_curve("translation_y", translation_y)
        log_curve("translation_z", translation_z)
        log_curve("rotation_3d_x", rotation_3d_x)
        log_curve("rotation_3d_y", rotation_3d_y)
        log_curve("rotation_3d_z", rotation_3d_z)

        print("")

        return zoom, angle, translation_x, translation_y, translation_z, rotation_3d_x, rotation_3d_y, rotation_3d_z

```
