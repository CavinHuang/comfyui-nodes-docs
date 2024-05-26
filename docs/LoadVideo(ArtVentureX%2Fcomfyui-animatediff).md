# Documentation
- Class name: LoadVideo
- Category: Animate Diff/Utils
- Output node: False
- Repo Ref: https://github.com/ArtVentureX/comfyui-animatediff.git

该节点旨在从视频文件中提取帧，允许根据起始点和限制选择特定的帧范围。它使得这些帧可以用于各种应用的进一步处理，例如动画或差异分析。

# Input types
## Required
- video
    - 视频参数至关重要，因为它定义了将从中提取帧的来源。它通过确定将要处理的内容和帧序列来影响节点的操作。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- frame_start
    - frame_start 参数指示应从哪个初始帧号开始提取。它通过设置帧选择的起始点来影响节点的执行。
    - Comfy dtype: INT
    - Python dtype: int
- frame_limit
    - frame_limit 参数定义了在 frame_start 之后要提取的最大帧数。它直接影响节点处理的帧数量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- frames
    - frames 输出是一系列提取的视频帧，转换成张量格式，对于下游过程中的进一步分析或操作至关重要。
    - Comfy dtype: TENSOR
    - Python dtype: torch.Tensor
- frame_count
    - frame_count 输出提供了提取的帧总数，为节点处理的数据量提供了参考。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class LoadVideo:

    @classmethod
    def INPUT_TYPES(s):
        input_dir = os.path.join(folder_paths.get_input_directory(), 'video')
        if not os.path.exists(input_dir):
            os.makedirs(input_dir, exist_ok=True)
        files = [f'video/{f}' for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        return {'required': {'video': (sorted(files), {'video_upload': True})}, 'optional': {'frame_start': ('INT', {'default': 0, 'min': 0, 'max': 4294967295, 'step': 1}), 'frame_limit': ('INT', {'default': 16, 'min': 1, 'max': 10240, 'step': 1})}}
    CATEGORY = 'Animate Diff/Utils'
    RETURN_TYPES = ('IMAGE', 'INT')
    RETURN_NAMES = ('frames', 'frame_count')
    FUNCTION = 'load'

    def load_gif(self, gif_path: str, frame_start: int, frame_limit: int):
        image = Image.open(gif_path)
        frames = []
        for (i, frame) in enumerate(ImageSequence.Iterator(image)):
            if i < frame_start:
                continue
            elif i >= frame_start + frame_limit:
                break
            else:
                frames.append(pil2tensor(frame.copy().convert('RGB')))
        return frames

    def load_video(self, video_path, frame_start: int, frame_limit: int):
        ensure_opencv()
        import cv2
        video = cv2.VideoCapture(video_path)
        video.set(cv2.CAP_PROP_POS_FRAMES, frame_start)
        frames = []
        for i in range(frame_limit):
            (ret, frame) = video.read()
            if ret:
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                frames.append(pil2tensor(Image.fromarray(frame)))
            else:
                break
        video.release()
        return frames

    def load(self, video: str, frame_start=0, frame_limit=16):
        video_path = folder_paths.get_annotated_filepath(video)
        (_, ext) = os.path.splitext(video_path)
        if ext.lower() in {'.gif', '.webp'}:
            frames = self.load_gif(video_path, frame_start, frame_limit)
        elif ext.lower() in {'.webp', '.mp4', '.mov', '.avi', '.webm'}:
            frames = self.load_video(video_path, frame_start, frame_limit)
        else:
            raise ValueError(f'Unsupported video format: {ext}')
        return (torch.cat(frames, dim=0), len(frames))

    @classmethod
    def IS_CHANGED(s, image, *args, **kwargs):
        image_path = folder_paths.get_annotated_filepath(image)
        m = hashlib.sha256()
        with open(image_path, 'rb') as f:
            m.update(f.read())
        return m.digest().hex()

    @classmethod
    def VALIDATE_INPUTS(s, video, *args, **kwargs):
        if not folder_paths.exists_annotated_filepath(video):
            return 'Invalid video file: {}'.format(video)
        return True
```