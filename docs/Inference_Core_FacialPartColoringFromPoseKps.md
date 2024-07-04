
# Documentation
- Class name: Inference_Core_FacialPartColoringFromPoseKps
- Category: ControlNet Preprocessors/Pose Keypoint Postprocess
- Output node: False

该节点旨在对姿态关键点数据中的特定面部部位进行着色，可为每个面部部位使用自定义颜色。它处理姿态关键点帧，根据提供的关键点数据和颜色规格，以视觉方式增强和区分不同的面部区域。

# Input types
## Required
- pose_kps
    - 包含各种面部部位位置信息的姿态关键点数据。它是生成彩色面部关键点的主要输入。
    - Comfy dtype: POSE_KEYPOINT
    - Python dtype: List[Dict]
- mode
    - 指定关键点的绘制模式，允许基于点或多边形渲染面部部位。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- skin
    - 指定皮肤面部部位的颜色，影响输出中皮肤区域的视觉表现。
    - Comfy dtype: STRING
    - Python dtype: str
- left_eye
    - 指定左眼的颜色，影响输出中左眼的可视化效果。
    - Comfy dtype: STRING
    - Python dtype: str
- right_eye
    - 指定右眼的颜色，影响输出中右眼的可视化效果。
    - Comfy dtype: STRING
    - Python dtype: str
- nose
    - 指定鼻子的颜色，影响输出中鼻子的可视化效果。
    - Comfy dtype: STRING
    - Python dtype: str
- upper_lip
    - 指定上唇的颜色，影响输出中上唇的可视化效果。
    - Comfy dtype: STRING
    - Python dtype: str
- inner_mouth
    - 指定口腔内部的颜色，影响输出中口腔内部的可视化效果。
    - Comfy dtype: STRING
    - Python dtype: str
- lower_lip
    - 指定下唇的颜色，影响输出中下唇的可视化效果。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 输出是根据指定颜色对面部部位进行着色的姿态帧的张量表示。
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
            facial_kps = rearrange(np.array(person["face_keypoints_2d"]), "(n c) -> n c", n=n, c=3)[:, :2] * (width, height)
            facial_kps = facial_kps.astype(np.int32)
            part_color = ImageColor.getrgb(facial_part_colors[part_name])[:3]
            if mode == "circle":
                start, end = FACIAL_PART_RANGES[part_name]
                part_contours = facial_kps[start:end+1]
                for pt in part_contours:
                    cv2.circle(canvas, pt, radius=2, color=part_color, thickness=-1)
                continue

            if part_name not in ["upper_lip", "inner_mouth", "lower_lip"]:
                start, end = FACIAL_PART_RANGES[part_name]
                part_contours = facial_kps[start:end+1]
                if part_name == "skin":
                    part_contours[17:] = part_contours[17:][::-1]
            else:
                part_contours = facial_kps[FACIAL_PART_RANGES[part_name], :]
            cv2.fillPoly(canvas, pts=[part_contours], color=part_color)
        return canvas

```
