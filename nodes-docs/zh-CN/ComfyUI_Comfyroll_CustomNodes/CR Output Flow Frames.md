# Documentation
- Class name: CR_OutputFlowFrames
- Category: Comfyroll/Animation/IO
- Output node: True
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_OutputFlowFrames节点旨在管理图像帧的输出过程，便于将图像保存到指定的目录。它支持直接图像输出和插值图像，确保帧之间的平滑过渡。该节点在图像处理流水线的最后阶段扮演着关键角色，专注于高效存储和组织生成的帧。

# Input types
## Required
- output_folder
    - output_folder参数指定了将要保存图像帧的目录。这对于组织输出并确保帧存储在正确的位置至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- current_image
    - current_image参数代表将要保存的当前帧图像。它是节点操作的基本输入，因为它是将要写入文件系统的实际内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- current_frame
    - current_frame参数表示当前正在处理的帧编号。它对于按反映处理顺序的序列命名和排序保存的图像至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- filename_prefix
    - filename_prefix参数用于定义保存图像的文件名的起始部分。它有助于为输出文件创建一致的命名约定，这对于后来的识别和处理可能是有益的。
    - Comfy dtype: STRING
    - Python dtype: str
- interpolated_img
    - interpolated_img参数提供了在输出中包含插值图像的选项。这可以增强帧之间的视觉过渡，提供更流畅的动画效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- output_path
    - output_path参数允许指定一个替代路径来保存图像，覆盖默认的输出目录。它在管理输出图像的存储位置方面提供了灵活性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- ui
    - 输出中的ui参数包含有关保存的图像的信息，包括它们的文件名、子文件夹位置和输出类型。这些数据可用于用户界面显示或进一步处理。
    - Comfy dtype: COMBO[Dict[str, List[Dict[str, Union[str, Dict[str, str]]]]]]
    - Python dtype: Dict[str, List[Dict[str, Union[str, Dict[str, str]]]]

# Usage tips
- Infra type: CPU

# Source code
```
class CR_OutputFlowFrames:

    def __init__(self):
        self.type = 'output'

    @classmethod
    def INPUT_TYPES(cls):
        output_dir = folder_paths.output_directory
        output_folders = [name for name in os.listdir(output_dir) if os.path.isdir(os.path.join(output_dir, name)) and len(os.listdir(os.path.join(output_dir, name))) != 0]
        return {'required': {'output_folder': (sorted(output_folders),), 'current_image': ('IMAGE',), 'filename_prefix': ('STRING', {'default': 'CR'}), 'current_frame': ('INT', {'default': 0, 'min': 0, 'max': 9999999, 'forceInput': True})}, 'optional': {'interpolated_img': ('IMAGE',), 'output_path': ('STRING', {'default': '', 'multiline': False})}}
    RETURN_TYPES = ()
    FUNCTION = 'save_images'
    OUTPUT_NODE = True
    CATEGORY = icons.get('Comfyroll/Animation/IO')

    def save_images(self, output_folder, current_image, current_frame, output_path='', filename_prefix='CR', interpolated_img=None):
        output_dir = folder_paths.get_output_directory()
        out_folder = os.path.join(output_dir, output_folder)
        if output_path != '':
            if not os.path.exists(output_path):
                print(f'[Warning] CR Output Flow Frames: The input_path `{output_path}` does not exist')
                return ('',)
            out_path = output_path
        else:
            out_path = os.path.join(output_dir, out_folder)
        print(f'[Info] CR Output Flow Frames: Output path is `{out_path}`')
        if interpolated_img is not None:
            output_image0 = current_image[0].cpu().numpy()
            output_image1 = interpolated_img[0].cpu().numpy()
            img0 = Image.fromarray(np.clip(output_image0 * 255.0, 0, 255).astype(np.uint8))
            img1 = Image.fromarray(np.clip(output_image1 * 255.0, 0, 255).astype(np.uint8))
            output_filename0 = f'{filename_prefix}_{current_frame:05}_0.png'
            output_filename1 = f'{filename_prefix}_{current_frame:05}_1.png'
            print(f'[Warning] CR Output Flow Frames: Saved {filename_prefix}_{current_frame:05}_0.png')
            print(f'[Warning] CR Output Flow Frames: Saved {filename_prefix}_{current_frame:05}_1.png')
            resolved_image_path0 = out_path + '/' + output_filename0
            resolved_image_path1 = out_path + '/' + output_filename1
            img0.save(resolved_image_path0, pnginfo='', compress_level=4)
            img1.save(resolved_image_path1, pnginfo='', compress_level=4)
        else:
            output_image0 = current_image[0].cpu().numpy()
            img0 = Image.fromarray(np.clip(output_image0 * 255.0, 0, 255).astype(np.uint8))
            output_filename0 = f'{filename_prefix}_{current_frame:05}.png'
            resolved_image_path0 = out_path + '/' + output_filename0
            img0.save(resolved_image_path0, pnginfo='', compress_level=4)
            print(f'[Info] CR Output Flow Frames: Saved {filename_prefix}_{current_frame:05}.png')
        result = {'ui': {'images': [{'filename': output_filename0, 'subfolder': out_path, 'type': self.type}]}}
        return result
```