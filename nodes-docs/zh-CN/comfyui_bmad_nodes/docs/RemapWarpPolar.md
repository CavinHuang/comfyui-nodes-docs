
# Documentation
- Class name: RemapWarpPolar
- Category: Bmad/CV/Transform
- Output node: False

RemapWarpPolar节点用于通过应用极坐标扭曲效果来变换图像。这种效果可以包括对半径、中心点的调整，以及选择是以对数还是线性方式应用变换。该节点支持逆变换，并可选择性地裁剪到变换后的区域。

# Input types
## Required
- max_radius
    - 指定极坐标扭曲变换的最大半径，影响效果从中心向外延伸的距离。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: int
- radius_adjust
    - 调整变换的有效半径，通过缩放最大半径来微调效果的覆盖范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- center_x_adjust
    - 调整变换中心点在x轴上的位置，允许水平移动效果的原点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- center_y_adjust
    - 调整变换中心点在y轴上的位置，允许垂直移动效果的原点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- log
    - 决定变换是否应用对数映射，改变扭曲的视觉效果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- inverse
    - 启用时，应用极坐标扭曲变换的逆变换，可能会反转效果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- crop
    - 启用对变换后图像的裁剪，仅保留受扭曲影响的区域，去除多余部分。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- remap
    - 节点返回经过极坐标扭曲效果处理的变换图像和可选的遮罩，两者都可能被裁剪。
    - Comfy dtype: REMAP
    - Python dtype: Tuple[numpy.ndarray, numpy.ndarray, NoneType]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapWarpPolar(RemapBase):
    MAX_RADIUS = {
        "half min shape": lambda shape: np.min(shape[:2]) / 2,
        "half max shape": lambda shape: np.max(shape[:2]) / 2,
        "hypot": lambda shape: np.hypot(shape[1] / 2, shape[0] / 2),
        "raw": lambda _: 1  # uses value set by radius_adjust
    }
    MAX_RADIUS_KEYS = list(MAX_RADIUS.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "max_radius": (s.MAX_RADIUS_KEYS, {"default": s.MAX_RADIUS_KEYS[0]}),
            "radius_adjust": ("FLOAT", {"default": 1, "min": .1, "max": 2048, "step": 0.01}),
            "center_x_adjust": ("FLOAT", {"default": 0, "min": -3, "max": 3, "step": 0.01}),
            "center_y_adjust": ("FLOAT", {"default": 0, "min": -3, "max": 3, "step": 0.01}),
            "log": ("BOOLEAN", {"default": False}),
            "inverse": ("BOOLEAN", {"default": True}),
            "crop": ("BOOLEAN", {"default": True})
        }
        }

    @staticmethod
    def warp(custom_data, src, interpolation, mask=None):
        max_radius, radius_adj, center_x_adj, center_y_adj, log, inverse, crop = custom_data

        center = (
        src.shape[1] / 2 + src.shape[1] / 2 * center_x_adj, src.shape[0] / 2 + src.shape[0] / 2 * center_y_adj)
        radius = RemapWarpPolar.MAX_RADIUS[max_radius](src.shape) * radius_adj
        flags = interpolation | cv.WARP_FILL_OUTLIERS
        flags |= cv.WARP_POLAR_LOG if log else cv.WARP_POLAR_LINEAR
        if inverse:
            flags |= cv.WARP_INVERSE_MAP

        img = cv.warpPolar(src, (src.shape[1], src.shape[0]), center, radius, flags)
        if mask is not None:
            mask = cv.warpPolar(mask, (mask.shape[1], mask.shape[0]), center, radius, flags)

        if crop:
            left, right = int(max(center[0] - radius, 0)), int(min(center[0] + radius, src.shape[1]))
            top, bottom = int(max(center[1] - radius, 0)), int(min(center[1] + radius, src.shape[0]))
            img = img[top:bottom, left:right]
            mask = mask[top:bottom, left:right]

        return img, mask, None

    def send_remap(self, max_radius, radius_adjust, center_x_adjust, center_y_adjust, log, inverse, crop):
        remap_data = {
            "func": lambda _, mr, ra, cx, cy, l, i, c: (mr, ra, cx, cy, l, i, c),  # does nothing, just returns args
            "xargs": [max_radius, radius_adjust, center_x_adjust, center_y_adjust, log, inverse, crop],
            "custom": RemapWarpPolar.warp
        }
        return (remap_data,)

```
