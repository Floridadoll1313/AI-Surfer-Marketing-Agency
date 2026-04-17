useEffect(() => {
  async function checkMembership() {
    const email = localStorage.getItem("email");
    if (!email) return;

    const res = await fetch(`/memberships/${email}`);
    const token = await res.text();

    if (token) {
      localStorage.setItem("membership", token);
    }
  }

  checkMembership();
}, []);
