import { useEffect, useState } from "react";
import { Download, FileText, Lock, Upload } from "lucide-react";
import { API_BASE_URL, resumeDownloadUrl } from "../config/api";

const formatBytes = (bytes) => {
  if (!bytes) return "0 KB";
  const units = ["B", "KB", "MB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
};

const ResumeCms = () => {
  const [adminToken, setAdminToken] = useState("");
  const [resume, setResume] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const loadResume = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/resume`);
      const data = await response.json();
      setResume(data.hasResume ? data : null);
    } catch {
      setStatus("Backend is not running. Start it with npm run dev inside backend.");
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!adminToken.trim()) {
      setStatus("Enter the admin token.");
      return;
    }

    if (!selectedFile) {
      setStatus("Choose a resume file first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);
    setIsUploading(true);
    setStatus("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/resume`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken.trim()}`,
        },
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed.");
      }

      setSelectedFile(null);
      setResume({ hasResume: true, ...data.resume });
      setStatus(data.message);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f2ed] px-5 pb-16 pt-32 text-black">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[3px] text-gray-600">
              <Lock size={16} />
              Admin CMS
            </p>
            <h1 className="text-4xl font-bold md:text-5xl">Resume Upload</h1>
          </div>

          {resume && (
            <a
              href={resumeDownloadUrl}
              download="MedunrajM-JSE.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <Download size={18} />
              View Download
            </a>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <section className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-md bg-black text-white">
                <FileText size={22} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Current Resume</h2>
                <p className="text-sm text-gray-600">Public download button uses this file.</p>
              </div>
            </div>

            {resume ? (
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-black">File:</span> {resume.originalName}
                </p>
                <p>
                  <span className="font-semibold text-black">Size:</span> {formatBytes(resume.size)}
                </p>
                <p>
                  <span className="font-semibold text-black">Updated:</span>{" "}
                  {new Date(resume.updatedAt).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-600">No resume uploaded yet.</p>
            )}
          </section>

          <form
            onSubmit={handleUpload}
            className="rounded-lg border border-black/10 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-5 text-xl font-semibold">Upload Resume</h2>

            <label className="mb-4 block">
              <span className="mb-2 block text-sm font-semibold">Admin Token</span>
              <input
                type="password"
                value={adminToken}
                onChange={(event) => setAdminToken(event.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                placeholder="Enter backend ADMIN_TOKEN"
              />
            </label>

            <label className="mb-5 block">
              <span className="mb-2 block text-sm font-semibold">Resume File</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
                className="w-full rounded-md border border-dashed border-gray-400 bg-[#f5f2ed] px-4 py-4 text-sm"
              />
            </label>

            <button
              type="submit"
              disabled={isUploading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-500"
            >
              <Upload size={18} />
              {isUploading ? "Uploading..." : "Upload Resume"}
            </button>

            {status && <p className="mt-4 text-center text-sm text-gray-700">{status}</p>}
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResumeCms;
