# Documentation
- Class name: DenseposeSubjectEstimation
- Category: util
- Output node: False
- Repo Ref: https://github.com/esheep/esheep_custom_nodes.git

DenseposeSubjectEstimation节点旨在处理和分析输入图像中的摆姿，通过一系列过滤器来选择基于指定标准最相关的摆姿。它通过将输入数据精炼到满足所需主题和体质要求的更专注的摆姿集合，从而为摆姿估计的高级任务做出贡献。

# Input types
## Required
- openpose_image
    - openpose_image参数至关重要，因为它是摆姿检测的视觉输入。它是节点进行分析的基础，决定了身体部位的存在和可见性，这随后影响摆姿的选择。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- subject
    - subject参数定义了用于过滤摆姿的特定主题标准。它在缩小到与感兴趣的主题相关的摆姿方面起着重要作用，从而增强了节点提供针对性结果的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- densepose_select_every_nth
    - densepose_select_every_nth参数是一个可选的整数，它决定了从过滤后的摆姿中选择摆姿的频率。它提供了一种控制输出摆姿密度的机制，允许在细节和计算效率之间取得平衡。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- DENSEPOSE
    - DENSEPOSE输出代表了输入图像中经过一系列基于主题和体质的过滤器精炼后最终选定的摆姿。它标志着节点分析的高潮，是用于进一步使用或展示的主要输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- DENSEPOSE_NAME
    - DENSEPOSE_NAME输出提供了选定摆姿的标识符或名称，提供了一个文本参考，可用于记录、标记或在节点主要功能范围之外进行额外处理。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class DenseposeSubjectEstimation:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'openpose_image': ('IMAGE',), 'subject': (['科目三'],), 'densepose_select_every_nth': ('INT', {'default': 1, 'min': 1, 'step': 1})}}
    RETURN_TYPES = ['IMAGE', 'STRING']
    RETURN_NAMES = ['DENSEPOSE', 'DENSEPOSE_NAME']
    FUNCTION = 'main'
    CATEGORY = 'util'

    def apply_physique_filter(self, poses):
        return poses

    def apply_region_filter(self, openpose_image, poses):
        batch_size = openpose_image.shape[0]
        if batch_size != 1:
            raise ValueError('Batch size must be 1')
        limb_colors = {'left_foot': (85, 0, 255), 'left_lower_leg': (0, 51, 153), 'left_knee': (0, 0, 255), 'left_upper_leg': (0, 102, 153), 'right_foot': (0, 170, 255), 'right_lower_leg': (0, 153, 102), 'right_knee': (0, 255, 255), 'right_upper_leg': (0, 153, 51)}
        image_tensor = (openpose_image * 255).to(torch.uint8)
        limb_pixel_count = {}
        for (limb, color) in limb_colors.items():
            count = count_color_pixels(image_tensor, color)
            limb_pixel_count[limb] = count
        foot_visible = limb_pixel_count['left_foot'] > 0 and limb_pixel_count['right_foot'] > 0
        upper_leg_visible = limb_pixel_count['left_upper_leg'] > 0 and limb_pixel_count['right_upper_leg'] > 0
        lower_leg_visible = limb_pixel_count['left_lower_leg'] > 0 and limb_pixel_count['right_lower_leg'] > 0
        knee_visible = limb_pixel_count['left_knee'] > 0 and limb_pixel_count['right_knee'] > 0
        if foot_visible and upper_leg_visible and lower_leg_visible:
            return self.filter_poses(poses, 'full_body')
        if upper_leg_visible:
            return self.filter_poses(poses, 'knee_body')
        return self.filter_poses(poses, 'upper_body')

    @staticmethod
    def filter_poses(poses, positive_tag=None):
        res = []
        for (i, pose) in enumerate(poses):
            if positive_tag is not None and positive_tag not in pose['tags']:
                continue
            res.append(pose)
        return res

    def main(self, openpose_image, subject, densepose_select_every_nth=1):
        all_poses = self.filter_poses(densepose_subject_presets, subject)
        poses = self.filter_poses(all_poses)
        poses = self.apply_region_filter(openpose_image, poses)
        poses = self.apply_physique_filter(poses)
        print('filtered densepose tags', list(set((tag for pose in poses for tag in pose['tags']))))
        if len(poses) == 0:
            poses = self.filter_poses(all_poses, 'fallback')
        pose = random.choice(poses)
        densepose_name = pose.get('name')
        densepose = load_densepose(densepose_name, densepose_select_every_nth=densepose_select_every_nth)
        print(f'selected densepose is {densepose_name}')
        return (densepose, densepose_name)
```