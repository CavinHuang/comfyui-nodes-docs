# Documentation
- Class name: TransitionBetween2Image
- Category: AIGC
- Output node: False
- Repo Ref: https://github.com/esheep/esheep_custom_nodes.git

TransitionBetween2Image节点用于生成两个图像之间的平滑过渡。它使用贝塞尔曲线进行插值，生成一系列将一个图像变形为另一个图像的帧。该节点特别适用于需要从一个状态逐渐变化到另一个状态的视觉效果中，例如动画或视频处理。

# Input types
## Required
- image_start
    - 要过渡的起始图像。它为动画序列设置了初始视觉状态。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or numpy.ndarray
- image_end
    - 过渡将变形为的结束图像。它代表序列的最终视觉状态。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or numpy.ndarray
- total_frames
    - 要为过渡生成的总帧数。增加此数字可以使过渡更平滑，但需要更多的处理时间。
    - Comfy dtype: INT
    - Python dtype: int
- begin_and_end_frames
    - 在过渡的开始和结束处复制的帧数，以提供暂停效果。
    - Comfy dtype: INT
    - Python dtype: int
- beiser_point_x
    - 定义过渡形状的贝塞尔曲线上的控制点的x坐标。
    - Comfy dtype: FLOAT
    - Python dtype: float
- beiser_point_y
    - 定义过渡形状的贝塞尔曲线上的控制点的y坐标。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- IMAGE
    - 由过渡生成的帧序列，可以用于进一步处理或显示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class TransitionBetween2Image:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image_start': ('IMAGE',), 'image_end': ('IMAGE',), 'total_frames': ('INT', {'default': 40, 'min': 1}), 'begin_and_end_frames': ('INT', {'default': 10, 'min': 0}), 'beiser_point_x': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'beiser_point_y': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.05})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'get_transition_frames'
    CATEGORY = 'AIGC'

    def get_transition_frames(self, image_start, image_end, total_frames, begin_and_end_frames, beiser_point_x, beiser_point_y):
        origin_image = image_start[0]
        outpating_image = image_end[0]
        frames = []
        origin_width = origin_image.shape[1]
        origin_height = origin_image.shape[0]
        new_width = outpating_image.shape[1]
        new_height = outpating_image.shape[0]
        if new_height / new_width > origin_height / origin_width:
            origin_height = new_height / new_width * origin_width
        else:
            origin_width = new_width / new_height * origin_height
        print(f'image rect = {origin_width} {origin_height} {new_width} {new_height}')
        white_origin_left = int((new_width - origin_width) / 2)
        white_origin_top = int((new_height - origin_height) / 2)
        a = np.array([[0.0, beiser_point_x, 1.0], [0.0, beiser_point_y, 1.0]])
        curve = bezier.Curve(a, degree=2)
        s_vals = np.linspace(0.0, 1.0, total_frames)
        data = curve.evaluate_multi(s_vals)
        print(f' curve data = {data}')
        for a in range(total_frames):
            i = data[1][a]
            current_left = int(white_origin_left * (1 - i))
            current_top = int(white_origin_top * (1 - i))
            current_width = int(origin_width + white_origin_left * i * 2)
            current_height = int(origin_height + white_origin_top * i * 2)
            print(f'a = {a} i = {i}  current rect = {current_left} {current_top} {current_width} {current_height}')
            current_img = outpating_image[current_top:current_top + current_height, current_left:current_left + current_width]
            current_img = current_img.numpy().astype(np.float32)
            img = cv2.resize(current_img, (new_width, new_height))
            frames.append(img)
            if a == 0:
                for j in range(begin_and_end_frames):
                    frames.append(img)
            elif a == total_frames - 1:
                for j in range(begin_and_end_frames):
                    frames.append(img)
        return_array = torch.Tensor(np.asarray(frames))
        return (return_array,)
```