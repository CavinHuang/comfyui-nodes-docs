
# Documentation
- Class name: FacialPartColoringFromPoseKps
- Category: ControlNet Preprocessors/Pose Keypoint Postprocess
- Output node: False

该节点旨在为姿态关键点数据中的特定面部部位上色，以实现面部特征的可视化区分和分析。它利用面部关键点来绘制或填充指定部位的颜色，支持自定义部位颜色和渲染模式。

# Input types
## Required
- pose_kps
    - 姿态关键点数据，包含一个或多个个体的各种面部和身体关键点位置。这些数据对确定需要上色的面部部位至关重要。
    - Comfy dtype: POSE_KEYPOINT
    - Python dtype: List[Dict]
- mode
    - 指定面部部位的渲染模式，可以是点或填充多边形，影响上色关键点的视觉呈现。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- skin
    - 指定皮肤面部部位的颜色。
    - Comfy dtype: STRING
    - Python dtype: str
- left_eye
    - 指定左眼面部部位的颜色。
    - Comfy dtype: STRING
    - Python dtype: str
- right_eye
    - 指定右眼面部部位的颜色。
    - Comfy dtype: STRING
    - Python dtype: str
- nose
    - 指定鼻子面部部位的颜色。
    - Comfy dtype: STRING
    - Python dtype: str
- upper_lip
    - 指定上唇面部部位的颜色。
    - Comfy dtype: STRING
    - Python dtype: str
- inner_mouth
    - 指定口腔内部面部部位的颜色。
    - Comfy dtype: STRING
    - Python dtype: str
- lower_lip
    - 指定下唇面部部位的颜色。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 根据提供的规格对面部部位进行上色处理后的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FacialPartColoringFromPoseKps:
    @classmethod
    def INPUT_TYPES(s):
        input_types = {
            "required": {"pose_kps": ("POSE_KEYPOINT",), "mode": (["point", "polygon"], {"default": "polygon"})}
        }
        for facial_part in FACIAL_PARTS: 
            input_types["required"][facial_part] = ("STRING", {"default": LAPA_COLORS[facial_part], "multiline": False})
        return input_types
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "colorize"
    CATEGORY = "ControlNet Preprocessors/Pose Keypoint Postprocess"
    def colorize(self, pose_kps, mode, **facial_part_colors):
        pose_frames = pose_kps
        np_frames = [self.draw_kps(pose_frame, mode, **facial_part_colors) for pose_frame in pose_frames]
        np_frames = np.stack(np_frames, axis=0)
        return (torch.from_numpy(np_frames).float() / 255.,)
            
    def draw_kps(self, pose_frame, mode, **facial_part_colors):
        width, height = pose_frame["canvas_width"], pose_frame["canvas_height"]
        canvas = np.zeros((height, width, 3), dtype=np.uint8)
        for person, part_name in itertools.product(pose_frame["people"], FACIAL_PARTS):
            n = len(person["face_keypoints_2d"]) // 3
            facial_kps = rearrange(np.array(person["face_keypoints_2d"]), "(n c) -> n c", n=n, c=3)[:, :2]
            if is_normalized(facial_kps):
                facial_kps *= (width, height)
            facial_kps = facial_kps.astype(np.int32)
            part_color = ImageColor.getrgb(facial_part_colors[part_name])[:3]
            part_contours = facial_kps[FACIAL_PART_RANGES[part_name], :]
            if mode == "point":
                for pt in part_contours:
                    cv2.circle(canvas, pt, radius=2, color=part_color, thickness=-1)
            else:
                cv2.fillPoly(canvas, pts=[part_contours], color=part_color)
        return canvas

```
