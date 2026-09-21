import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [urls, setUrls] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const [error, setError] = useState("");

  async function fetchUrls() {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5173/api/url");
      const responseData = response.data;
      setUrls(responseData.data.urls);
      setError("");
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          requestError.response?.data?.message ||
          "We could not load your links. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function createShortUrl() {
    if (!inputValue.trim()) return;

    setIsCreating(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:5173/api/url", {
        url: inputValue,
      });
      setCurrentUrl({
        originalUrl: response.data.data.originalUrl,
        shortCode: response.data.data.shortCode,
      });
      setInputValue("");
      await fetchUrls();
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          "We could not shorten that link. Please check it and try again.",
      );
    } finally {
      setIsCreating(false);
    }
  }

  async function deleteUrl(id) {
    setDeletingId(id);
    setError("");
    try {
      await axios.delete(`http://localhost:5173/api/url/${id}`);
      await fetchUrls();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "We could not delete that link. Please try again.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function copyShortUrl(shortCode) {
    await navigator.clipboard.writeText(`http://localhost:3000/${shortCode}`);
    setCopiedCode(shortCode);
    window.setTimeout(() => setCopiedCode(null), 1800);
  }

  useEffect(() => {
    void Promise.resolve().then(fetchUrls);
  }, []);

  return (
    <main className="min-h-screen px-4 py-8 text-neutral-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-tight">
            <span className="text-neutral-900">URL</span>
            <span className="text-orange-500">Shortener</span>
          </h1>
        </header>

        <section className="relative overflow-hidden rounded-3xl bg-neutral-950 px-6 py-10 text-white shadow-2xl shadow-orange-100 sm:px-10 sm:py-14">
          <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
              Your shortcut to everywhere
            </p>
            <h1 className="max-w-xl text-4xl font-black tracking-tight sm:text-6xl">
              Make every link count.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-neutral-400">
              Turn long, unwieldy URLs into clean links you can share, track,
              and manage in one place.
            </p>
            <form
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                createShortUrl();
              }}
            >
              <input
                type="url"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white px-4 py-3.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20"
                placeholder="Paste your long URL here"
                required
              />
              <button
                type="submit"
                disabled={isCreating}
                className="cursor-pointer rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-950/30 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCreating ? "Creating..." : "Shorten URL"}
              </button>
            </form>
          </div>
        </section>

        {error && (
          <div
            className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={fetchUrls}
              className="cursor-pointer font-bold underline"
            >
              Retry
            </button>
          </div>
        )}

        {currentUrl && (
          <section className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-700">
              Your new short link
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a
                className="cursor-pointer truncate text-lg font-bold text-orange-600 hover:text-orange-700"
                href={`http://localhost:3000/${currentUrl.shortCode}`}
                target="_blank"
                rel="noreferrer"
              >
                http://localhost:3000/{currentUrl.shortCode}
              </a>
              <button
                type="button"
                onClick={() => copyShortUrl(currentUrl.shortCode)}
                className="cursor-pointer rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                {copiedCode === currentUrl.shortCode ? "Copied" : "Copy link"}
              </button>
            </div>
          </section>
        )}

        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-sm font-bold text-orange-600">Your links</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight">
                Link activity
              </h2>
            </div>
            <p className="text-sm font-medium text-neutral-500">
              {urls.length} {urls.length === 1 ? "link" : "links"}
            </p>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-sm text-neutral-500">
              Loading your links...
            </div>
          ) : urls.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center">
              <p className="text-lg font-bold">No links yet</p>
              <p className="mt-2 text-sm text-neutral-500">
                Your shortened URLs will appear here once you create one.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {urls.map((url) => (
                <article
                  key={url._id}
                  className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                    <div className="min-w-0 flex-1">
                      <a
                        href={`http://localhost:3000/${url.shortCode}`}
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer font-bold text-orange-600 hover:text-orange-700"
                      >
                        localhost:3000/{url.shortCode}
                      </a>
                      <p
                        className="mt-2 truncate text-sm text-neutral-500"
                        title={url.originalUrl}
                      >
                        {url.originalUrl}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-6 border-t border-neutral-100 pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                      <div className="text-center">
                        <p className="text-xl font-black">{url.clicks ?? 0}</p>
                        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                          Clicks
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => copyShortUrl(url.shortCode)}
                          className="cursor-pointer rounded-lg border border-orange-200 px-3 py-2 text-xs font-bold text-orange-700 transition hover:bg-orange-50"
                        >
                          {copiedCode === url.shortCode ? "Copied" : "Copy"}
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === url._id}
                          onClick={() => deleteUrl(url._id)}
                          className="cursor-pointer rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === url._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
