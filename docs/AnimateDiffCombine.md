# Documentation
- Class name: AnimateDiffCombine
- Category: Animate Diff
- Output node: True
- Repo Ref: https://github.com/ArtVentureX/comfyui-animatediff.git

AnimateDiffCombine节点旨在从一系列图像生成动画GIF。它处理输入图像，通过调整帧率和循环次数来创建连贯的动画，允许对最终输出进行自定义控制。该节点还提供了保存生成的GIF的选项，并包括创建乒乓效应的功能，增强了动画的视觉效果。

# Input types
## Required
- images
    - 'image'参数是节点用来生成动画帧的图像张量序列。它对节点的操作至关重要，因为它直接影响输出GIF的内容和质量。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
## Optional
- frame_rate
    - 'frame_rate'参数决定了动画播放的速度。它是设置GIF节奏的重要因素，影响帧与帧之间的过渡速度。
    - Comfy dtype: INT
    - Python dtype: int
- loop_count
    - 'loop_count'参数指定动画应该循环多少次。它在控制GIF的行为时很重要，特别是当确定它是否应该无限循环或设置循环次数时。
    - Comfy dtype: INT
    - Python dtype: int
- save_image
    - 'save_image'参数指示是否应将生成的GIF保存到输出目录。它在节点的功能中发挥作用，决定最终产品是否要保存以供将来使用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- filename_prefix
    - 'filename_prefix'参数为保存的GIF文件名提供前缀。它对于识别和组织输出文件至关重要，确保它们易于与其他文件区分开来。
    - Comfy dtype: STRING
    - Python dtype: str
- format
    - 'format'参数定义了输出GIF的文件格式。它很重要，因为它决定了将创建的文件类型，影响动画在不同平台上的兼容性和外观。
    - Comfy dtype: COMBO[image/gif, image/webp]
    - Python dtype: str
- pingpong
    - 'pingpong'参数，当设置为True时，会在动画中创建一个乒乓效应，反转帧的顺序，为GIF添加一个独特的视觉元素。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- prompt
    - 'prompt'参数用于向GIF添加文本描述或元数据，这对于提供有关动画的上下文或附加信息非常有用。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - 'extra_pnginfo'参数允许在构成GIF的PNG文件中包含额外的元数据。它可以增强输出文件的信息丰富度。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, str]

# Output types
- ui
    - 'ui'参数在输出中是一个包含有关生成的GIF的信息的字典，包括文件路径和格式。它很重要，因为它为用户提供了对输出文件的引用，以便进一步使用或共享。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, List[Dict[str, Union[str, Dict[str, str]]]]

# Usage tips
- Infra type: CPU

# Source code
```
class AnimateDiffCombine:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'frame_rate': ('INT', {'default': 8, 'min': 1, 'max': 24, 'step': 1}), 'loop_count': ('INT', {'default': 0, 'min': 0, 'max': 100, 'step': 1}), 'save_image': ('BOOLEAN', {'default': True}), 'filename_prefix': ('STRING', {'default': 'animate_diff'}), 'format': (['image/gif', 'image/webp'] + video_formats,), 'pingpong': ('BOOLEAN', {'default': False})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    OUTPUT_NODE = True
    CATEGORY = 'Animate Diff'
    FUNCTION = 'generate_gif'

    def generate_gif(self, images, frame_rate: int, loop_count: int, save_image=True, filename_prefix='AnimateDiff', format='image/gif', pingpong=False, prompt=None, extra_pnginfo=None):
        frames: List[Image.Image] = []
        for image in images:
            img = 255.0 * image.cpu().numpy()
            img = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))
            frames.append(img)
        output_dir = folder_paths.get_output_directory() if save_image else folder_paths.get_temp_directory()
        (full_output_folder, filename, counter, subfolder, _) = folder_paths.get_save_image_path(filename_prefix, output_dir)
        metadata = PngInfo()
        if prompt is not None:
            metadata.add_text('prompt', json.dumps(prompt))
        if extra_pnginfo is not None:
            for x in extra_pnginfo:
                metadata.add_text(x, json.dumps(extra_pnginfo[x]))
        file = f'{filename}_{counter:05}_.png'
        file_path = os.path.join(full_output_folder, file)
        frames[0].save(file_path, pnginfo=metadata, compress_level=4)
        if pingpong:
            frames = frames + frames[-2:0:-1]
        (format_type, format_ext) = format.split('/')
        if format_type == 'image':
            file = f'{filename}_{counter:05}_.{format_ext}'
            file_path = os.path.join(full_output_folder, file)
            frames[0].save(file_path, format=format_ext.upper(), save_all=True, append_images=frames[1:], duration=round(1000 / frame_rate), loop=loop_count, compress_level=4)
        else:
            import shutil
            import subprocess
            ffmpeg_path = shutil.which('ffmpeg')
            if ffmpeg_path is None:
                raise ProcessLookupError('Could not find ffmpeg')
            video_format_path = os.path.join(video_formats_dir, format_ext + '.json')
            with open(video_format_path, 'r') as stream:
                video_format = json.load(stream)
            file = f"{filename}_{counter:05}_.{video_format['extension']}"
            file_path = os.path.join(full_output_folder, file)
            dimensions = f'{frames[0].width}x{frames[0].height}'
            args = [ffmpeg_path, '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', dimensions, '-r', str(frame_rate), '-i', '-'] + video_format['main_pass'] + [file_path]
            env = os.environ
            if 'environment' in video_format:
                env.update(video_format['environment'])
            with subprocess.Popen(args, stdin=subprocess.PIPE, env=env) as proc:
                for frame in frames:
                    proc.stdin.write(frame.tobytes())
        previews = [{'filename': file, 'subfolder': subfolder, 'type': 'output' if save_image else 'temp', 'format': format}]
        return {'ui': {'videos': previews}}
```