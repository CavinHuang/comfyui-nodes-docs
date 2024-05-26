# Documentation
- Class name: TransitionFromSize
- Category: AIGC
- Output node: False
- Repo Ref: https://github.com/esheep/esheep_custom_nodes.git

TransitionFromSize节点旨在生成一系列图像，这些图像描绘了一个平滑的从一个图像大小过渡到另一个图像大小的过程。它使用贝塞尔曲线来控制变形过程，确保视觉上吸引人的转变。该节点的功能集中在创建动态视觉内容，这些内容可以用于动画或视觉效果等各种应用中。

# Input types
## Required
- image
    - 图像参数是将生成过渡序列的源图像。这是一个关键输入，因为它定义了过渡的内容和起点。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or numpy.ndarray
- from_image_width
    - from_image_width参数指定过渡开始时图像的初始宽度。它在确定变形的起始尺寸中起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- from_image_height
    - from_image_height参数定义了图像的初始高度。它对于建立过渡序列中起始帧的垂直尺寸至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- total_frames
    - total_frames参数规定过渡序列中的总帧数。它影响变形过程的持续时间和细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- begin_and_end_frames
    - begin_and_end_frames参数确定在过渡开始和结束时添加的重复帧数。这可以用来创建一个更渐进的开始和结束序列。
    - Comfy dtype: INT
    - Python dtype: int
- beiser_point_x
    - beiser_point_x参数是贝塞尔曲线上的一个控制点，它影响过渡的水平方面。它是形成变形路径曲率的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- beiser_point_y
    - beiser_point_y参数是贝塞尔曲线上的一个控制点，它影响过渡的垂直方面。它对于定义变形路径的垂直曲率至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- IMAGE
    - TransitionFromSize节点的输出是一系列图像，代表从原始大小到新大小的过渡。序列中的每个帧都是由贝塞尔曲线控制的变形过程的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class TransitionFromSize:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'from_image_width': ('INT', {'min': 1}), 'from_image_height': ('INT', {'min': 1}), 'total_frames': ('INT', {'default': 40, 'min': 1}), 'begin_and_end_frames': ('INT', {'default': 10, 'min': 0}), 'beiser_point_x': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'beiser_point_y': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.05})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'get_transition_from_size'
    CATEGORY = 'AIGC'

    def get_transition_from_size(self, image, from_image_width, from_image_height, total_frames, begin_and_end_frames, beiser_point_x, beiser_point_y):
        outpating_image = image[0]
        frames = []
        origin_width = from_image_width
        origin_height = from_image_height
        new_width = outpating_image.shape[1]
        new_height = outpating_image.shape[0]
        if (origin_width > new_width) | (origin_height > new_height):
            origin_width = new_width * 0.75
            origin_height = new_height * 0.75
        white_origin_left = (new_width - origin_width) / 2
        white_origin_top = (new_height - origin_height) / 2
        print(f'image rect origin_width = {origin_width} origin_height = {origin_height} new_width = {new_width} new_height = {new_height}image white_origin_left = {white_origin_left} white_origin_top = {white_origin_top}')
        a = np.array([[0.0, beiser_point_x, 1.0], [0.0, beiser_point_y, 1.0]])
        curve = bezier.Curve(a, degree=2)
        s_vals = np.linspace(0.0, 1.0, total_frames)
        data = curve.evaluate_multi(s_vals)
        print(f' curve data = {data}')
        for a in range(total_frames):
            i = data[1][a]
            current_left = white_origin_left * (1 - i)
            current_top = white_origin_top * (1 - i)
            current_width = origin_width + 2 * i * white_origin_left
            current_height = origin_height + 2 * i * white_origin_top
            current_right = int(current_left + current_width)
            current_bottom = int(current_top + current_height)
            print(f'a = {a} i = {i}  current rect left = {current_left} width = {current_width} top = {current_top} height = {current_height}')
            current_img = outpating_image[int(current_top):current_bottom, int(current_left):current_right]
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