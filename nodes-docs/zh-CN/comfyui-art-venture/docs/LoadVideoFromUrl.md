
# Documentation
- Class name: LoadVideoFromUrl
- Category: Art Venture/Loaders
- Output node: False

LoadVideoFromUrl节点旨在从URL加载视频内容，并将其转换为适合进一步处理或分析的格式。它支持处理各种URL格式，包括视频文件的直接链接，并将其转换为系统内使用的标准化视频格式。

# Input types
## Required
- video
    - "video"参数是一个字符串，表示要加载的视频的URL。它在确定视频获取和处理的来源方面起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- force_rate
    - 指定加载视频的目标帧率，允许控制播放速度或帧率标准化。
    - Comfy dtype: INT
    - Python dtype: Optional[float]
- force_size
    - 定义加载视频的目标分辨率，实现调整大小或纵横比。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Optional[str]
- custom_width
    - 为加载的视频设置自定义宽度，覆盖默认或指定的'force_size'宽度。
    - Comfy dtype: INT
    - Python dtype: Optional[int]
- custom_height
    - 为加载的视频设置自定义高度，覆盖默认或指定的'force_size'高度。
    - Comfy dtype: INT
    - Python dtype: Optional[int]
- frame_load_cap
    - 限制从视频中加载的帧数，适用于处理长视频或采样。
    - Comfy dtype: INT
    - Python dtype: Optional[int]
- skip_first_frames
    - 跳过视频开头指定数量的帧，用于跳过不需要的内容或片头。
    - Comfy dtype: INT
    - Python dtype: Optional[int]
- select_every_nth
    - 从视频中加载每第n帧，允许降低帧率或选择性帧分析。
    - Comfy dtype: INT
    - Python dtype: Optional[int]
## Optional
- meta_batch
    - 启用加载视频的元数据批处理，优化视频元数据至关重要的场景。
    - Comfy dtype: VHS_BatchManager
    - Python dtype: Optional[bool]

# Output types
- frames
    - 表示加载视频的张量列表。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- frame_count
    - 包含每个加载视频的帧数的列表。
    - Comfy dtype: INT
    - Python dtype: List[int]
- has_video
    - 指示是否成功加载任何视频的布尔值。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
    class UtilLoadVideoFromUrl(LoadVideoPath):
        @classmethod
        def INPUT_TYPES(s):
            inputs = LoadVideoPath.INPUT_TYPES()
            inputs["required"]["video"] = ("STRING", {"default": "", "multiline": True, "dynamicPrompts": False})
            return inputs

        CATEGORY = "Art Venture/Loaders"
        FUNCTION = "load"
        RETURN_TYPES = ("IMAGE", "INT", "BOOLEAN")
        RETURN_NAMES = ("frames", "frame_count", "has_video")
        OUTPUT_IS_LIST = (True, True, False)

        def load_gif(
            self,
            gif_path: str,
            force_rate: int,
            force_size: str,
            skip_first_frames: int,
            frame_load_cap: int,
            select_every_nth: int,
        ):
            from PIL import Image, ImageSequence

            image = Image.open(gif_path)
            frames = []
            total_frames_evaluated = -1

            if force_rate != 0:
                print(f"Force rate is not supported for gifs/webps")
            if frame_load_cap == 0:
                frame_load_cap = 999999999

            for i, frame in enumerate(ImageSequence.Iterator(image)):
                if i < skip_first_frames:
                    continue
                elif i >= skip_first_frames + frame_load_cap:
                    break
                else:
                    total_frames_evaluated += 1
                    if total_frames_evaluated % select_every_nth == 0:
                        frames.append(pil2tensor(frame.copy().convert("RGB")))

            images = torch.cat(frames, dim=0)

            if force_size != "Disabled":
                height = images.shape[1]
                width = images.shape[2]
                new_size = target_size(width, height, force_size)
                if new_size[0] != width or new_size[1] != height:
                    s = images.movedim(-1, 1)
                    s = common_upscale(s, new_size[0], new_size[1], "lanczos", "disabled")
                    images = s.movedim(1, -1)

            return (images, len(frames))

        def load_url(self, video: str, **kwargs):
            url = video.strip('"')

            if url == "":
                return (None, 0)

            if os.path.isfile(url):
                pass
            elif url.startswith("file://"):
                url = url[7:]
                url = os.path.abspath(url)

                if not os.path.isfile(url):
                    raise Exception(f"File {url} does not exist")

                if url.startswith(input_dir):
                    video = url[len(input_dir) + 1 :] + " [input]"
                elif url.startswith(output_dir):
                    video = url[len(output_dir) + 1 :] + " [output]"
                elif url.startswith(temp_dir):
                    video = url[len(temp_dir) + 1 :] + " [temp]"
                else:
                    # move file to temp_dir
                    import shutil

                    tempdir = os.path.join(temp_dir, "video")
                    if not os.path.exists(tempdir):
                        os.makedirs(tempfile, exist_ok=True)

                    filename = os.path.basename(url)
                    filepath = os.path.join(tempdir, filename)

                    i = 1
                    split = os.path.splitext(filename)
                    while os.path.exists(filepath):
                        filename = f"{split[0]} ({i}){split[1]}"
                        filepath = os.path.join(tempdir, filename)
                        i += 1

                    shutil.copy(url, filepath)
                    video = "video/" + filename + " [temp]"
            elif url.startswith("http://") or url.startswith("https://"):
                from torch.hub import download_url_to_file
                from urllib.parse import urlparse

                parts = urlparse(url)
                filename = os.path.basename(parts.path)
                tempfile = os.path.join(temp_dir, "video")
                if not os.path.exists(tempfile):
                    os.makedirs(tempfile, exist_ok=True)
                tempfile = os.path.join(tempfile, filename)

                print(f'Downloading: "{url}" to {tempfile}\n')
                download_url_to_file(url, tempfile, progress=True)

                video = "video/" + filename + " [temp]"
            elif url.startswith("/view?"):
                from urllib.parse import parse_qs

                qs = parse_qs(url[6:])
                filename = qs.get("name", qs.get("filename", None))
                if filename is None:
                    raise Exception(f"Invalid url: {url}")

                filename = filename[0]
                subfolder = qs.get("subfolder", None)
                if subfolder is not None:
                    filename = os.path.join(subfolder[0], filename)

                dirtype = qs.get("type", ["input"])
                video = f"{filename} [{dirtype[0]}]"
            else:
                raise Exception(f"Invalid url: {url}")

            if ".gif [" in video.lower() or ".webp [" in video.lower():
                gif_path = folder_paths.get_annotated_filepath(video.strip('"'))
                res = self.load_gif(gif_path, **kwargs)
            else:
                res = self.load_video(video=video, **kwargs)

            return res

        def load(self, video: str, **kwargs):
            urls = video.strip().split("\n")

            videos = []
            frame_counts = []

            for url in urls:
                images, frame_count = self.load_url(url, **kwargs)
                if images is not None and frame_count > 0:
                    videos.append(images)
                    frame_counts.append(frame_count)

            has_video = len(videos) > 0
            if not has_video:
                image = torch.zeros((1, 64, 64, 3), dtype=torch.float32, device="cpu")
                videos.append(image)
                frame_counts.append(1)

            return (videos, frame_counts, has_video)

        @classmethod
        def IS_CHANGED(s, video: str, **kwargs):
            return video

        @classmethod
        def VALIDATE_INPUTS(s, **kwargs):
            return True

```
